import { DiaAtendimento } from '../../../atendimentos/interfaces/dia-atendimento.interface';
import { TEMA_PRIMARIO } from '../../../../constantes/time-picker';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';

@Component({
  selector: 'app-dialog-config-dia-atendimento',
  templateUrl: './dialog-config-dia-atendimento.component.html',
  styleUrls: ['./dialog-config-dia-atendimento.component.scss']
})
export class DialogConfigDiaAtendimentoComponent implements OnInit {

  horarioForm: FormGroup;
  eventos: any[];

  darkTheme: NgxMaterialTimepickerTheme;
  temaPrimario: NgxMaterialTimepickerTheme;

  constructor(
    public dialogRef: MatDialogRef<DialogConfigDiaAtendimentoComponent>,
    formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DiaAtendimento) {
    this.horarioForm = formBuilder.group({
      id: [''],
      diaSemana: [null],
      hora: ['', Validators.required],
      qtdSessoes: [1],
      duracao: [40]
    });
    this.temaPrimario = TEMA_PRIMARIO;
  }

  ngOnInit() {
    if (this.data) {
      this.horarioForm.patchValue({
        id: this.data.id,
        diaSemana: this.data.diaSemana,
        hora: this.data.hora,
        qtdSessoes: this.data.qtdSessoes,
        duracao: this.data.duracao
      });
    }
  }

  confirmar() {
    this.dialogRef.close(this.horarioForm.value);
  }

}
