import { FormGroup, FormBuilder } from '@angular/forms';
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
  selecao = {

  };

  darkTheme: NgxMaterialTimepickerTheme;
  temaPrimario: NgxMaterialTimepickerTheme;

  constructor(
    public dialogRef: MatDialogRef<DialogAdicionarEventoComponent>,
    formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Date) {
    this.horarioForm = formBuilder.group({
      inicio: [''],
      quantidade: [3],
      duracao: [40]
    });
    this.temaPrimario = {
      container: {
        bodyBackgroundColor: '#fafafa',
        buttonColor: '#48a999'
      },
      dial: {
        dialBackgroundColor: '#4fb3bf',
        dialActiveColor: '#455a64',
        dialInactiveColor: '#cfd8dc'
      },
      clockFace: {
        clockFaceBackgroundColor: '#fafafa',
        clockHandColor: '#00838f',
        clockFaceTimeInactiveColor: '#00838f'
      }
    };
    this.darkTheme = {
      container: {
        bodyBackgroundColor: '#424242',
        buttonColor: '#fff'
      },
      dial: {
        dialBackgroundColor: '#555',
      },
      clockFace: {
        clockFaceBackgroundColor: '#555',
        clockHandColor: '#9fbd90',
        clockFaceTimeInactiveColor: '#fff'
      }
    };
  }

  ngOnInit() {
    this.horarioForm.valueChanges.subscribe(value => {
      console.log(value);
    });
  }

}
