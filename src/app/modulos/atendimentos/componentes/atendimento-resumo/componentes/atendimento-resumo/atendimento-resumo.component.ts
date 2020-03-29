import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { Location } from '@angular/common';
import { CountUpOptions } from 'countup.js';

moment.locale('pt-BR');


@Component({
  selector: 'app-atendimento-resumo',
  templateUrl: './atendimento-resumo.component.html',
  styleUrls: ['./atendimento-resumo.component.scss']
})
export class AtendimentoResumoComponent implements OnInit {

  atendimento: {
    paciente: {
      nome: string;
      data_nascimento: string;
      idade: number;
      sexo: string;
      nome_mae: string;
      nome_pai: string;
      email: string;
      telefone: string[],
      foto: string;
    },
    responsavel: string;
    contato_responsavel: string;
    data_inicio: string;
    total_recebido: number;
    total_receber: number;
    total_sessoes: number;
    queixa: string;
    ultimos_acontecimentos: { tipo: number; descricao: string; data: string }[]
  };

  atendimentoId: number;

  countUpOptionsMoeda: CountUpOptions = {
    decimalPlaces: 2,
    useGrouping: true,
    separator: '.',
    decimal: ',',
    prefix: 'R$ '
  };

  countUpOptions: CountUpOptions = {
    useGrouping: true,
    separator: '.'
  };

  evolucaoOcultada = true;

  constructor(public location: Location, public route: ActivatedRoute) {
    this.atendimento = {
      paciente: {
        nome: 'Matheus Felipe',
        data_nascimento: moment(new Date().toISOString()).subtract(6, 'years').format('ll'),
        idade: null,
        sexo: 'M',
        nome_mae: 'Ana Lúcia',
        nome_pai: 'Mário Henrique',
        email: null,
        telefone: [],
        foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcShzsUCDBt-yFKpKj9C2de7skiUTKTdKTvoBL5DbZ-XZ-4XHZhs'
      },
      responsavel: 'Ana Lúcia',
      contato_responsavel: '81999009999',
      data_inicio: moment(new Date().toISOString()).subtract(56, 'days').format('ll'),
      total_recebido: 800.00,
      total_receber: 240.00,
      total_sessoes: 8,
      queixa: 'Fala poucas palavras e não interage.',
      ultimos_acontecimentos: [
        { tipo: 1, descricao: 'Nota', data: moment(new Date().toISOString()).subtract(7, 'days').format('ll') },
        { tipo: 1, descricao: 'Imagem', data: moment(new Date().toISOString()).subtract(14, 'days').format('ll') },
        { tipo: 1, descricao: 'Nota', data: moment(new Date().toISOString()).subtract(21, 'days').format('ll') },
        { tipo: 1, descricao: 'Nota', data: moment(new Date().toISOString()).subtract(28, 'days').format('ll') },
        { tipo: 1, descricao: 'Áudio', data: moment(new Date().toISOString()).subtract(35, 'days').format('ll') },
        { tipo: 1, descricao: 'Imagem', data: moment(new Date().toISOString()).subtract(42, 'days').format('ll') },
        { tipo: 1, descricao: 'Nota', data: moment(new Date().toISOString()).subtract(49, 'days').format('ll') },
        { tipo: 1, descricao: 'Nota', data: moment(new Date().toISOString()).subtract(56, 'days').format('ll') }
      ]
    };

    this.atendimento.paciente.idade = Math.abs(moment(new Date().toISOString()).subtract(6, 'years').diff(moment(), 'years'));
  }

  ngOnInit() {
    this.atendimentoId = Number.parseInt(this.route.snapshot.params.id_atendimento, 10);
  }

}
