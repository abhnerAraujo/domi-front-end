import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-BR');

export interface Atendimento {
  id: number;
  nome: string;
  data_inicio: string;
}

@Component({
  selector: 'app-atendimentos-lista',
  templateUrl: './atendimentos-lista.component.html',
  styleUrls: ['./atendimentos-lista.component.scss']
})
export class AtendimentosListaComponent implements OnInit {

  atendimentos: Atendimento[] = [
    { id: 1, nome: 'Matheus Felipe', data_inicio: moment(new Date().toISOString()).format('ll') },
    { id: 2, nome: 'Osvaldo Macedo', data_inicio: moment(new Date().toISOString()).format('ll') },
    { id: 3, nome: 'Giovane Castanhares', data_inicio: moment(new Date().toISOString()).format('ll') },
    { id: 3, nome: 'Jucelino Abravanel', data_inicio: moment(new Date().toISOString()).format('ll') },
    { id: 3, nome: 'Armando Sorriso', data_inicio: moment(new Date().toISOString()).format('ll') },
    { id: 3, nome: 'Niravel de Holanda', data_inicio: moment(new Date().toISOString()).format('ll') },
    { id: 3, nome: 'Marcos Nixael', data_inicio: moment(new Date().toISOString()).format('ll') },
  ];


  constructor() { }

  ngOnInit() {
  }

}
