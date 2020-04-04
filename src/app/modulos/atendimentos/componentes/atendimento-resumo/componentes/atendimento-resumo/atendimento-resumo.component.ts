import { DURACAO_SNACKBAR } from './../../../../../../constantes/config';
import { MatSnackBar } from '@angular/material';
import { AtendimentosService } from './../../../../services/atendimentos/atendimentos.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { Location } from '@angular/common';
import { CountUpOptions } from 'countup.js';
import { Atendimento } from '../../../../interfaces';

moment.locale('pt-BR');


@Component({
  selector: 'app-atendimento-resumo',
  templateUrl: './atendimento-resumo.component.html',
  styleUrls: ['./atendimento-resumo.component.scss']
})
export class AtendimentoResumoComponent implements OnInit {

  atendimento: Atendimento;

  atendimentoId: number;
  carregando: boolean;

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

  mostrarMais: boolean;

  constructor(
    public location: Location,
    public route: ActivatedRoute,
    private atendimentoService: AtendimentosService,
    private snackbar: MatSnackBar) {
    this.mostrarMais = false;
  }

  ngOnInit() {
    this.atendimentoId = Number.parseInt(this.route.snapshot.params.id_atendimento, 10);
    this.carregarAtendimento();
  }

  async carregarAtendimento() {
    this.carregando = true;
    this.atendimentoService.detalhar(this.atendimentoId, true)
      .subscribe(
        r => this.atendimento = r.dados[0],
        e => this.snackbar.open(e.error.mensagem, 'Ok', { duration: DURACAO_SNACKBAR }),
        () => this.carregando = false
      );
  }

}
