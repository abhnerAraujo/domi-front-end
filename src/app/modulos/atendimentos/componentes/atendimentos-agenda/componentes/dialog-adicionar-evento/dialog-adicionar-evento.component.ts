import { MomentService } from 'src/app/modulos/compartilhado/services/moment/moment.service';
import { TEMA_PRIMARIO } from './../../../../../../constantes/time-picker';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';

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
    private moment: MomentService,
    @Inject(MAT_DIALOG_DATA) public data: Date) {
    this.horarioForm = formBuilder.group({
      inicio: ['', Validators.required],
      quantidade: [1],
      duracao: [40],
      titulo: ['', Validators.required]
    });
    this.temaPrimario = TEMA_PRIMARIO;
  }

  ngOnInit() { }

  confirmar() {
    this.eventos = [];
    const value = this.horarioForm.value;
    if (value.inicio) {
      const dataAtendimento = this.data.toISOString();
      const inicio = this.moment.momentBr(dataAtendimento)
        .hour(Number(value.inicio.split(':').shift()))
        .minute(Number(value.inicio.split(':').pop()));
      this.dialogRef.close({
        title: value.titulo,
        start: inicio.toISOString(),
        end: inicio.add(value.duracao * value.quantidade, 'minutes').toISOString(),
        description: 'Agendamento de sessão',
        duration: value.duracao,
        amount: value.quantidade
      });
    }
  }

}
