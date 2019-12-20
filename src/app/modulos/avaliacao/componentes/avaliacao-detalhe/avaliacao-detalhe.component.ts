import { QuestaoResposta } from '../../../compartilhado/componentes/questao-item/questao-item.component';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-avaliacao-detalhe',
  templateUrl: './avaliacao-detalhe.component.html',
  styleUrls: ['./avaliacao-detalhe.component.scss']
})
export class AvaliacaoDetalheComponent implements OnInit {

  @Input() sessao: boolean;
  @Output() cancelado: EventEmitter<void>;

  questoes: QuestaoResposta[] = [];

  constructor(public location: Location) {
    this.cancelado = new EventEmitter();
  }

  ngOnInit() {
    this.questoes = [
      { questao: 'Exemplo de questao', resposta: 'Exemplo de resposta.' }
    ];
  }

  adicionarQuestao() {
    this.questoes.push({ questao: '', resposta: '' });
  }

}
