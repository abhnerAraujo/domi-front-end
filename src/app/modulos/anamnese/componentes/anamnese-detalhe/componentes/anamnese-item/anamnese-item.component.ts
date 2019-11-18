import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
