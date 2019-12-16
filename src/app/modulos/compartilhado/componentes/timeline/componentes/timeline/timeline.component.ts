import { MomentService } from './../../../../services/moment/moment.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface TimeLineItem {
  id: number;
  titulo: string;
  descricao: string;
  data: string;
}

export interface TimeLineConfig {
  cores: {
    principal: string;
    secundaria: string;
    inicio: string;
    linha: string;
  };
  mostrarData: boolean;
  height: number;
  mensagemVazio: string;
  descendente: boolean;
  clicavel: boolean;
}

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  itens: TimeLineItem[];
  config: TimeLineConfig;

  @Input()
  set timeline(value: TimeLineItem[]) {
    this.itens = value;
    this.ordenar();
  }
  @Input()
  set options(value: TimeLineConfig) {
    this.config = value;
  }

  @Output() selecao: EventEmitter<TimeLineItem>;

  constructor(private moment: MomentService) {
    this.selecao = new EventEmitter();
  }

  ngOnInit() {
  }

  ordenar() {
    this.itens.sort((a, b) => {
      if (this.moment.momentBr(a.data).diff(b.data) > 1) {
        return -1;
      }
      if (this.moment.momentBr(a.data).diff(b.data) < 1) {
        return 1;
      }
      return 0;
    });
  }

}
