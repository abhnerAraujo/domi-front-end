import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

export interface QuestaoResposta {
  questao: string; resposta: string;
}
@Component({
  selector: 'app-anamnese-item',
  templateUrl: './anamnese-item.component.html',
  styleUrls: ['./anamnese-item.component.scss']
})
export class AnamneseItemComponent implements OnInit {

  @Input() index: number;
  @Input() questaoResposta: QuestaoResposta;
  @Output() remover: EventEmitter<void>;

  formQuestao: FormGroup;
  naoSalvo: boolean;

  constructor(public fb: FormBuilder) {
    this.naoSalvo = true;
    this.remover = new EventEmitter();
  }

  ngOnInit() {
    this.formQuestao = this.fb.group({
      questao: [this.questaoResposta.questao],
      resposta: [this.questaoResposta.resposta]
    });
  }

}
