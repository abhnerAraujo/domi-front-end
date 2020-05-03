import { DURACAO_SNACKBAR } from './../../../../constantes/config';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { AtendimentosService } from './../../../atendimentos/services/atendimentos/atendimentos.service';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { AnamneseAvaliacaoItem } from '../../../atendimentos/interfaces';

@Component({
  selector: 'app-avaliacao-detalhe',
  templateUrl: './avaliacao-detalhe.component.html',
  styleUrls: ['./avaliacao-detalhe.component.scss']
})
export class AvaliacaoDetalheComponent implements OnInit {

  @Input() sessao: number;
  @Output() cancelado: EventEmitter<void>;

  questoes: AnamneseAvaliacaoItem[] = [];
  questaoRespostaNova: AnamneseAvaliacaoItem;
  atendimentoId: number;

  constructor(
    public location: Location,
    private atendimentoService: AtendimentosService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar
  ) {
    this.cancelado = new EventEmitter();
    this.questaoRespostaNova = {
      anamnese_avaliacao_item_id: 0,
      tipo: 'V',
      item: '',
      resposta: '',
      sessao: this.sessao
    };
  }

  ngOnInit() {
    this.questoes = [];
    this.atendimentoId = Number.parseInt(this.route.snapshot.params.id_atendimento, 10);
    this.carregarAvaliacoes();
  }

  adicionarQuestao() {
    this.questoes.push(null);
  }

  carregarAvaliacoes() {
    this.atendimentoService.avaliacoes(this.atendimentoId)
      .subscribe(
        r => this.questoes = r.dados,
        e => this.snackbar.open(e.error.mensagem, 'Ok', { duration: DURACAO_SNACKBAR })
      );
  }

}
