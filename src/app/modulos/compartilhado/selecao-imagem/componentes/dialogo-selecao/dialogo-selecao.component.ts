import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialogo-selecao',
  templateUrl: './dialogo-selecao.component.html',
  styleUrls: ['./dialogo-selecao.component.scss']
})
export class DialogoSelecaoComponent implements OnInit {

  files: File[] = [];

  constructor(public dialogRef: MatDialogRef<DialogoSelecaoComponent>) { }

  ngOnInit() {
  }

  arquivoEscolhido(evento) {
    if (evento.addedFiles && evento.addedFiles.length > 0) {
      this.files = [evento.addedFiles.pop()];
    }
  }

  aoRemover(file: File) {
    this.files.splice(this.files.indexOf(file), 1);
  }

}
