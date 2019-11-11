import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-atendimentos-lista',
  templateUrl: './atendimentos-lista.component.html',
  styleUrls: ['./atendimentos-lista.component.scss']
})
export class AtendimentosListaComponent implements OnInit {

  atendimentos = [
    { nome: 'Matheus Felipe', dh_proximo_atendimento: '2019-11-23 10:00:00' },
    { nome: 'Ana Maria', dh_proximo_atendimento: '2019-11-25 10:00:00' },
    { nome: 'Marcos Henrique', dh_proximo_atendimento: null }
  ];

  constructor() { }

  ngOnInit() {
  }

}
