import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-adicionar-evento',
  templateUrl: './dialog-adicionar-evento.component.html',
  styleUrls: ['./dialog-adicionar-evento.component.scss']
})
export class DialogAdicionarEventoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogAdicionarEventoComponent>) { }

  ngOnInit() {
  }

}
