import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-salvar-nota',
  templateUrl: './salvar-nota.component.html',
  styleUrls: ['./salvar-nota.component.scss']
})
export class SalvarNotaComponent implements OnInit {

  @Input() nota: string;
  @Output() notaChange: EventEmitter<string>;
  @Output() cancelado: EventEmitter<void>;
  @Output() salvar: EventEmitter<void>;

  constructor() {
    this.notaChange = new EventEmitter();
    this.cancelado = new EventEmitter();
    this.salvar = new EventEmitter();
  }

  ngOnInit() {
  }

}
