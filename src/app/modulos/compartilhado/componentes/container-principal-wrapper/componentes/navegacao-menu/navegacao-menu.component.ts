import { DadosUsuario, Espaco } from './../../../../../acesso/interfaces/dados-usuario-response.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navegacao-menu',
  templateUrl: './navegacao-menu.component.html',
  styleUrls: ['./navegacao-menu.component.scss']
})
export class NavegacaoMenuComponent implements OnInit {

  espacos: Espaco[];
  carregandoEspacos: boolean;
  espacoAtual: Espaco = null;
  dadosUsuario: DadosUsuario;

  constructor() {
    this.dadosUsuario = JSON.parse(localStorage.getItem('x-user-data'));
  }

  ngOnInit() {
    this.carregarEspacos();
  }

  carregarEspacos() {
    this.carregandoEspacos = true;
    this.espacos = [];
    this.dadosUsuario.perfis.forEach(perfil => this.espacos.push(...perfil.espacos));
    if (this.espacoAtual === null) {
      this.alternarEspaco(this.espacos[0]);
    }
    this.carregandoEspacos = false;
  }

  alternarEspaco(espaco: Espaco) {
    this.espacoAtual = espaco;
    localStorage.setItem('x-context', `${espaco.espaco_id}`);
  }

}
