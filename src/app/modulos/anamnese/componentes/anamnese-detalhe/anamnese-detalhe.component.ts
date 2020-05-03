import { DURACAO_SNACKBAR } from './../../../../constantes/config';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { AtendimentosService } from './../../../atendimentos/services/atendimentos/atendimentos.service';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { AnamneseAvaliacaoItem } from '../../../atendimentos/interfaces';

@Component({
  selector: 'app-anamnese-detalhe',
  templateUrl: './anamnese-detalhe.component.html',
  styleUrls: ['./anamnese-detalhe.component.scss']
})
export class AnamneseDetalheComponent implements OnInit {

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
      tipo: 'A',
      item: '',
      resposta: '',
      sessao: this.sessao
    };
  }

  ngOnInit() {
    this.questoes = [];
    this.atendimentoId = Number.parseInt(this.route.snapshot.params.id_atendimento, 10);
    this.carregarAnamneses();
  }

  adicionarQuestao() {
    this.questoes.push(null);
  }

  carregarAnamneses() {
    this.questoes = [];
    this.atendimentoService.anameneses(this.atendimentoId)
      .subscribe(
        r => this.questoes = r.dados,
        e => this.snackbar.open(e.error.mensagem, 'Ok', { duration: DURACAO_SNACKBAR })
      );
  }

}
