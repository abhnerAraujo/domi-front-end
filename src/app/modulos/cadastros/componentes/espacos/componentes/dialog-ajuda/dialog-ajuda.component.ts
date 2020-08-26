import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-ajuda',
  templateUrl: './dialog-ajuda.component.html',
  styleUrls: ['./dialog-ajuda.component.scss']
})
export class DialogAjudaComponent implements OnInit {

  constructor(public matDialogRef: MatDialogRef<DialogAjudaComponent>) { }

  ngOnInit() {
  }

}
