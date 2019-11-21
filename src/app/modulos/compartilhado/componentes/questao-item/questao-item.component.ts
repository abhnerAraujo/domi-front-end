import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

export interface QuestaoResposta {
  questao: string; resposta: string;
}

@Component({
  selector: 'app-questao-item',
  templateUrl: './questao-item.component.html',
  styleUrls: ['./questao-item.component.scss']
})
export class QuestaoItemComponent implements OnInit {

  @Input() index: number;
  @Input() questaoResposta: QuestaoResposta;
  @Output() remover: EventEmitter<void>;
  @Output() adicionarQuestao: EventEmitter<void>;

  formQuestao: FormGroup;
  naoSalvo: boolean;

  constructor(public fb: FormBuilder) {
    this.naoSalvo = true;
    this.remover = new EventEmitter();
    this.adicionarQuestao = new EventEmitter();
  }

  ngOnInit() {
    if (this.questaoResposta) {
      this.formQuestao = this.fb.group({
        questao: [this.questaoResposta.questao],
        resposta: [this.questaoResposta.resposta]
      });
    }
  }

}
