import { MatSnackBar } from '@angular/material';
import { UsuarioService } from './../../../../../acesso/services/usuario/usuario.service';
import { MomentService } from 'src/app/modulos/compartilhado/services/moment/moment.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LOCAL_STORAGE_ITENS, DURACAO_SNACKBAR } from './../../../../../../constantes/config';
import { DadosUsuario, Perfil } from './../../../../../acesso/interfaces/dados-usuario-response.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {

  dadosUsuario: DadosUsuario;
  perfilAtivo: Perfil;
  formPerfil: FormGroup;
  edicao: boolean;

  constructor(private fb: FormBuilder,
    public momentService: MomentService,
    private usuarioService: UsuarioService,
    private snackbar: MatSnackBar) {
    this.formPerfil = fb.group({
      primeiro_nome: [null, Validators.required],
      sobrenome: [null, Validators.required],
      numero_inscricao: [],
      inscricao_data: []
    });
  }

  ngOnInit() {
    this.carregarDadosUsuario();
  }

  carregarDadosUsuario() {
    this.dadosUsuario = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ITENS.dados_usuario));
    this.perfilAtivo = this.dadosUsuario.perfis[0];
    this.formPerfil.patchValue({
      primeiro_nome: this.dadosUsuario.usuario.primeiro_nome,
      sobrenome: this.dadosUsuario.usuario.sobrenome,
      numero_inscricao: this.perfilAtivo.numero_inscricao,
      inscricao_data: this.perfilAtivo.inscricao_data,
    });
  }

  salvar(dados: any) {
    this.usuarioService.editar(dados)
      .subscribe(r => this.usuarioService
        .dadosUsuario()
        .subscribe(
          usuario => localStorage.setItem(LOCAL_STORAGE_ITENS.dados_usuario, JSON.stringify(usuario.dados)),
          e => this.snackbar.open(e.error.mensagem, 'Ok', { duration: DURACAO_SNACKBAR }),
          () => this.carregarDadosUsuario()
        )
      );
  }

}
