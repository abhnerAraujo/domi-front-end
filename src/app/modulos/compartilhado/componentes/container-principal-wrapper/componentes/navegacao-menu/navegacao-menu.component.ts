import { Espaco } from './../../../../interfaces/listar-espacos-response.interface';
import { EspacoService } from './../../../../services/espaco/espaco.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navegacao-menu',
  templateUrl: './navegacao-menu.component.html',
  styleUrls: ['./navegacao-menu.component.scss']
})
export class NavegacaoMenuComponent implements OnInit {

  espacos: Espaco[];
  carregandoEspacos: boolean;
  espacoAtual: Espaco;

  constructor(private espacoService: EspacoService) { }

  ngOnInit() {
    this.carregarEspacos();
  }

  carregarEspacos() {
    this.carregandoEspacos = true;
    this.espacoService.listar().subscribe(resultado => {
      this.carregandoEspacos = false;
      this.espacos = resultado.dados;
      if (!this.espacoAtual) {
        this.alternarEspaco(this.espacos[0]);
      }
    },
      error => {
        this.carregandoEspacos = false;
      });
  }

  alternarEspaco(espaco: Espaco) {
    this.espacoAtual = espaco;
    localStorage.setItem('x-context', espaco.id);
  }

}
