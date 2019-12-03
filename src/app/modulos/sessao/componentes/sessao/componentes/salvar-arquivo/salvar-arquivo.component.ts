import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-salvar-arquivo',
  templateUrl: './salvar-arquivo.component.html',
  styleUrls: ['./salvar-arquivo.component.scss']
})
export class SalvarArquivoComponent implements OnInit {

  @Output() cancelado: EventEmitter<void>;
  @Output() salvar: EventEmitter<void>;

  files: File[] = [];

  constructor() {
    this.cancelado = new EventEmitter();
    this.salvar = new EventEmitter();
  }

  ngOnInit() {
  }

  arquivoEscolhido(evento) {
    console.log(evento);
    this.files.push(...evento.addedFiles);
  }

  aoRemover(file: File) {
    this.files.splice(this.files.indexOf(file), 1);
  }

}
