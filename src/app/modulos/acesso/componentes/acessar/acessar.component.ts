import { AuthService } from './../../../compartilhado/services/auth/auth.service';
import { PROFISSOES, TEXTOS } from './../../../../constantes/valores';
import { LOCAL_STORAGE_ITENS } from './../../../../constantes/config';
import { UsuarioService } from './../../services/usuario/usuario.service';
import { CriarUsuarioRequest } from './../../interfaces/criar-usuario-request.interface';
import { MatSnackBar, MatDrawerContent } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, fromEvent } from 'rxjs';
import { AcessoService } from './../../services/acesso/acesso.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-acessar',
  templateUrl: './acessar.component.html',
  styleUrls: ['./acessar.component.scss']
})
export class AcessarComponent implements OnInit, OnDestroy {

  requestSubscription: Subscription;
  snackSubscription: Subscription;
  loginForm: FormGroup;
  entrando: boolean;
  criarUsuario: boolean;
  formCriacaoValido: boolean;
  usuarioCriar: CriarUsuarioRequest;
  erros: any;
  profissoes = PROFISSOES;
  profissaoAtual = 0;
  textoApoioLogin: string;

  constructor(
    private router: Router
    , private acessoService: AcessoService
    , private usuarioService: UsuarioService
    , fb: FormBuilder
    , private snack: MatSnackBar
    , private authService: AuthService) {
    this.loginForm = fb.group({
      email: ['', Validators.compose([
        Validators.email, Validators.required
      ])],
      senha: ['', Validators.compose([
        Validators.required
      ])]
    });
    this.textoApoioLogin = TEXTOS.texto_apoio_login;
  }

  ngOnInit() {
    firebase.auth().useDeviceLanguage();
    setInterval(() => {
      this.profissaoAtual = this.profissaoAtual === (this.profissoes.length - 1)
        ? 0
        : this.profissaoAtual + 1;
    }, 1000);
    fromEvent(document.getElementById('content'), 'scroll')
      .subscribe(
        r => {
          if ((r.target as any).scrollTop >= 200) {
            document.getElementById('primeira-linha').style.padding = '0';
            document.getElementById('titulo').style.fontSize = '28px';
            document.getElementById('navegacao').classList.remove('slide-right-nav');
            // document.getElementById('btn-acesso').classList.remove('slide-bottom-nav');
            if (!document.getElementById('navegacao').classList.contains('slide-left')) {
              document.getElementById('navegacao').classList.add('slide-left');
            }
            // if (!document.getElementById('btn-acesso').classList.contains('slide-top-nav')) {
            //   document.getElementById('btn-acesso').classList.add('slide-top-nav');
            // }
          } else if ((r.target as any).scrollTop === 0) {
            document.getElementById('navegacao').classList.add('slide-right-nav');
            document.getElementById('navegacao').classList.remove('slide-left');

            // document.getElementById('btn-acesso').classList.add('slide-bottom-nav');
            // document.getElementById('btn-acesso').classList.remove('slide-top-nav');
            document.getElementById('titulo').style.fontSize = '64px';
            document.getElementById('primeira-linha').style.padding = '24px 8px 70px 8px';
          }
        }
      );
    this.fazerLogin();
  }

  async oauthLogin(provider) {
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (err) {
      if (err.email && err.credential && err.code === 'auth/account-exists-with-different-credential') {
        const providers = await firebase.auth().fetchSignInMethodsForEmail(err.email);
        const firstPopupProviderMethod = providers.find(p => this.authService.supportedPopupSignInMethods.includes(p));

        const linkedProvider = this.authService.getProvider(firstPopupProviderMethod);
        linkedProvider.setCustomParameters({ login_hint: err.email });

        const result = await firebase.auth().signInWithPopup(linkedProvider);
        result.user.linkWithCredential(err.credential);
      }
    }
  }

  fazerLogin() {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (firebase.auth().currentUser) {
        const idToken = await firebase.auth().currentUser.getIdToken();
        this.acessoService.authFirebase(idToken).subscribe(
          r => {
            localStorage.setItem(LOCAL_STORAGE_ITENS.token, r.dados.token);
          },
          e => {
            this.textoApoioLogin = TEXTOS.texto_apoio_login;
            this.entrando = false;
            console.log(e);
          },
          this.dadosUsuario
        );
      }
    });
  }

  async loginFacebook() {
    this.textoApoioLogin = TEXTOS.conectando;
    this.entrando = true;
    // try {
    //   const provider = new firebase.auth.FacebookAuthProvider();
    //   // provider.addScope('user_birthday');
    //   provider.setCustomParameters({
    //     display: 'popup'
    //   });
    //   await firebase.auth().signInWithPopup(provider);
    //   this.fazerLogin();
    // } catch (erro) {
    //   this.textoApoioLogin = TEXTOS.texto_apoio_login;
    //   this.entrando = false;
    //   console.log(erro);
    // }
    await this.oauthLogin(this.authService.getProvider(firebase.auth.FacebookAuthProvider.PROVIDER_ID));
    // ...
    // Handle Errors here.
    // var errorCode = error.code;
    // var errorMessage = error.message;
    // // The email of the user's account used.
    // var email = error.email;
    // // The firebase.auth.AuthCredential type that was used.
    // var credential = error.credential;
  }

  async loginGoogle() {
    // Using a popup.
    this.textoApoioLogin = TEXTOS.conectando;
    this.entrando = true;
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      await firebase.auth().signInWithPopup(provider);
      this.fazerLogin();
    } catch (erro) {
      this.textoApoioLogin = TEXTOS.texto_apoio_login;
      this.entrando = false;
    }
  }

  dadosUsuario = () => {
    this.usuarioService
      .dadosUsuario()
      .subscribe(usuarioData => {
        if (usuarioData.sucesso) {
          localStorage.setItem('x-user-data', JSON.stringify(usuarioData.dados));
          if (usuarioData.dados.perfis && usuarioData.dados.perfis.length) {
            this.router.navigate(['home']);
          } else {
            this.router.navigate(['usuario/criar-perfil']);
          }
        } else {
          this.snack.open(usuarioData.mensagem, 'OK', { duration: 3500 });
        }
      });
  }

  entrar() {
    this.entrando = true;
    this.requestSubscription = this.acessoService.login(this.loginForm.value)
      .subscribe(data => {
        if (data.sucesso) {
          const token = data.dados.token;
          localStorage.setItem('x-access-token', token);
          this.usuarioService
            .dadosUsuario()
            .subscribe(usuarioData => {
              if (usuarioData.sucesso) {
                localStorage.setItem('x-user-data', JSON.stringify(usuarioData.dados));
                if (usuarioData.dados.perfis && usuarioData.dados.perfis.length) {
                  this.router.navigate(['home']);
                } else {
                  this.router.navigate(['usuario/criar-perfil']);
                }
              } else {
                this.snack.open(usuarioData.mensagem, 'OK', { duration: 3500 });
              }
            });
        } else {
          this.entrando = false;
          this.loginForm.get('senha').reset();
          this.snack.open(data.mensagem, 'OK', { duration: 3500 });
        }
      },
        erro => {
          this.entrando = false;
          this.loginForm.get('senha').reset();
          this.snack.open(erro.error.mensagem, 'OK', { duration: 3500 });
        });
  }

  ngOnDestroy() {
    if (this.requestSubscription) {
      this.requestSubscription.unsubscribe();
    }
  }

  formChange(event: any) {
    this.usuarioCriar = {
      email: event.email,
      senha: event.senha,
      primeiro_nome: event.primeiro_nome,
      sobrenome: event.sobrenome,
      data_nascimento: event.data_nascimento ? event.data_nascimento.toISOString() : '',
      sexo: event.sexo
    };
  }

  cadastrar() {
    this.entrando = true;
    if (this.formCriacaoValido) {
      this.requestSubscription = this.usuarioService.cadastrar(this.usuarioCriar)
        .subscribe(
          resposta => {
            if (resposta.sucesso && resposta.dados[0].id) {
              this.snack.open(resposta.mensagem, 'ENTRAR', { duration: 3500 });
              this.criarUsuario = false;
              this.loginForm.patchValue({
                email: this.usuarioCriar.email,
                senha: ''
              });
            } else {
              this.snack.open(resposta.mensagem, 'OK', { duration: 3500 });
            }
            console.log(resposta);
            this.entrando = false;
          },
          erro => {
            if (erro.status === 409) {
              this.erros = erro.error.erros;
            } else {
              this.snack.open('Ops! Ocorreu um erro inesperado.', 'OK', { duration: 3500 });
            }
            this.entrando = false;
          }
        );
    }
  }

}
