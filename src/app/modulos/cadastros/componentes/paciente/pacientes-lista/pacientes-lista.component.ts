import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pacientes-lista',
  templateUrl: './pacientes-lista.component.html',
  styleUrls: ['./pacientes-lista.component.scss']
})
export class PacientesListaComponent implements OnInit {

  pacientes = [
    { nome: 'Matheus Felipe', idade: 6, responsavel: 'Beatriz Fernanda' },
    { nome: 'Ana Maria', idade: 23, responsavel: null },
    { nome: 'Matheus Felipe', idade: 3, responsavel: 'Thiago Alves' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
