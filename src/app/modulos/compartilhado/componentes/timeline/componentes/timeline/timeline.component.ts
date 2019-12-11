import { MomentService } from './../../../../services/moment/moment.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface TimeLineItem {
  titulo: string;
  descricao: string;
  data: string;
}

export interface TimeLineConfig {
  cores: {
    principal: string;
    inicio: string;
    linha: string;
  };
  mostrarData: boolean;
  height: number;
  mensagemVazio: string;
  descendente: boolean;
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

  @Output() click: EventEmitter<void>;

  constructor(private moment: MomentService) {
    this.click = new EventEmitter();
  }

  ngOnInit() {
  }

  ordenar() {
    this.itens.sort((a, b) => {
      console.log(this.moment.momentBr(b.data).diff(a.data));
      return 0;
    });
  }

}
