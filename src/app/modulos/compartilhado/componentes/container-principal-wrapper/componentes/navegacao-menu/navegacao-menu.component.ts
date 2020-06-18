import { UsuarioService } from './../../../../../acesso/services/usuario/usuario.service';
import { ContextoService } from './../../services/contexto/contexto.service';
import { Subscription } from 'rxjs';
import { DadosUsuario, Espaco } from './../../../../../acesso/interfaces/dados-usuario-response.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navegacao-menu',
  templateUrl: './navegacao-menu.component.html',
  styleUrls: ['./navegacao-menu.component.scss'],
  providers: [UsuarioService]
})
export class NavegacaoMenuComponent implements OnInit {

  espacos: Espaco[];
  carregandoEspacos: boolean;
  espacoAtual: Espaco = null;
  dadosUsuario: DadosUsuario;

  contextoSubscription: Subscription;

  constructor(private contextoService: ContextoService, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.carregarEspacos();
    this.contextoSubscription = this.contextoService.contexto.subscribe(r => this.atualizar());
  }

  carregarEspacos() {
    this.dadosUsuario = JSON.parse(localStorage.getItem('x-user-data'));
    this.carregandoEspacos = true;
    this.espacos = [];
    this.dadosUsuario.perfis.forEach(perfil => this.espacos.push(...perfil.espacos));
    const idContextoAtual = Number(localStorage.getItem('x-context'));
    if (idContextoAtual) {
      const espaco = this.espacos.find(e => e.espaco_id === idContextoAtual) || this.espacos[0];
      this.alternarEspaco(espaco);
    } else if (this.espacoAtual === null) {
      this.alternarEspaco(this.espacos[0]);
    }
    this.carregandoEspacos = false;
  }

  alternarEspaco(espaco: Espaco) {
    this.espacoAtual = espaco;
    localStorage.setItem('x-context', `${espaco.espaco_id}`);
  }

  atualizar() {
    const dados = JSON.parse(localStorage.getItem('x-user-data'));
    this.usuarioService.dadosUsuario()
      .subscribe(r => {
        localStorage.setItem('x-user-data', JSON.stringify(r.dados));
        this.carregarEspacos();
      });
  }

}
