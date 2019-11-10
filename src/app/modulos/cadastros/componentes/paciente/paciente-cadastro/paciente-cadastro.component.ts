import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

export const MY_FORMATS = {
  parse: {
    dateInput: 'L',
  },
  display: {
    dateInput: 'L',
    monthYearLabel: 'DD MM YYYY',
    dateA11yLabel: 'L',
    monthYearA11yLabel: 'DD MM YYYY',
  },
};

@Component({
  selector: 'app-paciente-cadastro',
  templateUrl: './paciente-cadastro.component.html',
  styleUrls: ['./paciente-cadastro.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class PacienteCadastroComponent implements OnInit {

  pacienteForm: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.pacienteForm = formBuilder.group({});
  }

  ngOnInit() {
  }

}
