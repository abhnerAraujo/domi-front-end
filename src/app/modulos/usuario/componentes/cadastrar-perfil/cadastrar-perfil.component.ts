import { DURACAO_SNACKBAR, LOCAL_STORAGE_ITENS } from './../../../../constantes/config';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsuarioService } from './../../services/usuario/usuario.service';
import { SalvarProfissionalRequest } from './../../interfaces/salvar-profissional-request.interface';
import { MomentService } from './../../../compartilhado/services/moment/moment.service';
import { DadosUsuario } from './../../../acesso/interfaces/dados-usuario-response.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SIGLAS_ESTADOS } from './../../../../constantes/estados';
import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';

@Component({
  selector: 'app-cadastrar-perfil',
  templateUrl: './cadastrar-perfil.component.html',
  styleUrls: ['./cadastrar-perfil.component.scss']
})
export class CadastrarPerfilComponent implements OnInit {

  estados = SIGLAS_ESTADOS;
  profissaoForm: FormGroup;
  registroForm: FormGroup;
  espacoForm: FormGroup;
  dadosUsuario: DadosUsuario;
  requestSubscription: Subscription;
  carregando: boolean;

  constructor(fb: FormBuilder,
    public moment: MomentService,
    private usuarioService: UsuarioService,
    private router: Router,
    private snack: MatSnackBar) {
    this.dadosUsuario = JSON.parse(localStorage.getItem('x-user-data'));
    this.profissaoForm = fb.group({
      profissional_tipo: [null, Validators.required]
    });
    this.registroForm = fb.group({
      numero_inscricao: [],
      inscricao_uf: [],
      inscricao_data: [],
      ativo: [true],
      inscricao_tipo: [1],
      conselho: [undefined]
    });
    this.espacoForm = fb.group({
      descricao: ['Pessoal', Validators.required],
      padrao: [true]
    });
  }

  ngOnInit() {
  }

  finalizar() {
    this.carregando = true;
    const dadosProfissional: SalvarProfissionalRequest = {
      numero_inscricao: this.registroForm.get('numero_inscricao').value,
      inscricao_uf: this.registroForm.get('inscricao_uf').value,
      inscricao_data: undefined,
      ativo: this.registroForm.get('ativo').value,
      inscricao_tipo: this.registroForm.get('inscricao_tipo').value,
      profissional_tipo: this.profissaoForm.get('profissional_tipo').value,
      conselho: this.registroForm.get('conselho').value,
      espaco: this.espacoForm.value
    };
    if (this.registroForm.get('inscricao_data').value) {
      dadosProfissional.inscricao_data = (this.registroForm.get('inscricao_data').value as Moment).toISOString();
    }
    this.requestSubscription = this.usuarioService
      .criarPerfil(dadosProfissional)
      .subscribe(resultado => {
        localStorage.setItem(LOCAL_STORAGE_ITENS.contexto, `${resultado.dados.profissional_id}`);
        this.usuarioService.dadosUsuario()
          .subscribe(usuarioResultado => {
            localStorage.setItem(LOCAL_STORAGE_ITENS.dados_usuario, JSON.stringify(usuarioResultado.dados));
            this.snack.open('Seu perfil foi criado! Redirecionando...', 'Entendi', { duration: DURACAO_SNACKBAR });
            setTimeout(() => this.router.navigate(['/']), 2000);
          },
            erro => {
              this.carregando = false;
              this.snack.open(erro.error.mensagem, 'OK', { duration: 3500 });
            }
          );
      },
        erro => {
          this.carregando = false;
          this.snack.open(erro.error ? erro.error.mensagem : 'Ops! Ocorreu um erro.', 'OK', { duration: DURACAO_SNACKBAR });
        });
  }

}
