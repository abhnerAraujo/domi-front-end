import { TEMA_PRIMARIO } from './../../../../../../constantes/time-picker';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-dialog-adicionar-evento',
  templateUrl: './dialog-adicionar-evento.component.html',
  styleUrls: ['./dialog-adicionar-evento.component.scss']
})
export class DialogAdicionarEventoComponent implements OnInit {

  horarioForm: FormGroup;
  eventos: any[];

  darkTheme: NgxMaterialTimepickerTheme;
  temaPrimario: NgxMaterialTimepickerTheme;

  constructor(
    public dialogRef: MatDialogRef<DialogAdicionarEventoComponent>,
    formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Date) {
    this.horarioForm = formBuilder.group({
      inicio: ['', Validators.required],
      quantidade: [1],
      duracao: [40]
    });
    this.temaPrimario = TEMA_PRIMARIO;
  }

  ngOnInit() { }

  confirmar() {
    this.eventos = [];
    const value = this.horarioForm.value;
    if (value.inicio) {
      for (let i = 0; i < value.quantidade; i++) {
        const dataAtendimento = this.data.toISOString().split('T').shift();
        let horaAtendimento: string;
        if (i > 0) {
          horaAtendimento = moment(this.eventos[i - 1].end).format('HH:mm');
        } else {
          horaAtendimento = (value.inicio as string);
        }
        const inicio = moment(`${dataAtendimento} ${horaAtendimento}`);
        this.eventos.push({
          title: 'Matheus Felipe',
          start: inicio.toISOString(),
          end: inicio.add(value.duracao, 'minutes').toISOString(),
          description: 'Atendimento de Matheus Felipe (Sessão 1)'
        });
      }
    }
    this.dialogRef.close(this.eventos);
  }

}
