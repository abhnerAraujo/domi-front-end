import { UsuarioService } from './../../services/usuario/usuario.service';
import { CriarUsuarioRequest } from './../../interfaces/criar-usuario-request.interface';
import { MatSnackBar } from '@angular/material';
import { Usuario } from './../../interfaces/usuario.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AcessoService } from './../../services/acesso/acesso.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

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

  constructor(
    private router: Router
    , private acessoService: AcessoService
    , private usuarioService: UsuarioService
    , fb: FormBuilder
    , private snack: MatSnackBar) {
    this.loginForm = fb.group({
      email: ['', Validators.compose([
        Validators.email, Validators.required
      ])],
      senha: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  ngOnInit() {
  }

  entrar() {
    this.entrando = true;
    this.requestSubscription = this.acessoService.login(this.loginForm.value)
      .subscribe(data => {
        if (data.sucesso) {
          const dados = data.dados.dados;
          const id = data.dados.id;
          const usuario: Usuario = {
            email_confirmacao: dados.email_confirmacao,
            primeiro_nome: dados.primeiro_nome,
            sobrenome: dados.sobrenome,
            email: dados.email,
            id,
            data_nascimento: dados.data_nascimento,
            auth_codigo: dados.auth_codigo
          };

          localStorage.setItem('x-user-data', JSON.stringify(usuario));
          localStorage.setItem('x-access-token', `${id}`);

          this.router.navigate(['home']);
        } else {
          this.entrando = false;
          this.loginForm.get('senha').reset();
          this.snack.open(data.mensagem, 'OK', { duration: 3500 });
        }
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
      this.requestSubscription = this.usuarioService.login(this.usuarioCriar)
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
            this.entrando = false;
          },
          error => this.snack.open('Ops! Ocorreu um erro inesperado.', 'OK', { duration: 3500 })
        );
    }
  }

}
