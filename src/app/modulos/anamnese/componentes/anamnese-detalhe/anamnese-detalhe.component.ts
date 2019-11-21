import { QuestaoResposta } from '../../../compartilhado/componentes/questao-item/questao-item.component';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-anamnese-detalhe',
  templateUrl: './anamnese-detalhe.component.html',
  styleUrls: ['./anamnese-detalhe.component.scss']
})
export class AnamneseDetalheComponent implements OnInit {

  questoes: QuestaoResposta[] = [];

  constructor(public location: Location) { }

  ngOnInit() {
    this.questoes = [
      { questao: 'Exemplo de questao', resposta: 'Exemplo de resposta.' }
    ];
  }

  adicionarQuestao() {
    this.questoes.push({ questao: '', resposta: '' });
  }

}
