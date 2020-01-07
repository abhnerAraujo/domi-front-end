import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navegacao-menu',
  templateUrl: './navegacao-menu.component.html',
  styleUrls: ['./navegacao-menu.component.scss']
})
export class NavegacaoMenuComponent implements OnInit {

  espacos: string[];
  carregandoEspacos: boolean;
  espacoAtual = 'Pessoal';

  constructor() { }

  ngOnInit() {
  }

  carregarEspacos() {
    this.carregandoEspacos = true;
    setTimeout(() => {
      this.espacos = ['Pessoal', 'Morro da Conceição NASF', 'Clínica Domi'];
      this.carregandoEspacos = false;
    }, 1500);
  }

}
