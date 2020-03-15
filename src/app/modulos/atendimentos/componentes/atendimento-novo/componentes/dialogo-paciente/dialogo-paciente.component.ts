import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-dialogo-paciente',
  templateUrl: './dialogo-paciente.component.html',
  styleUrls: ['./dialogo-paciente.component.scss']
})
export class DialogoPacienteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogoPacienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number) { }

  ngOnInit() {
  }

}
