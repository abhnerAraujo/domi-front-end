import { TEMA_PRIMARIO } from './../../../../../../constantes/time-picker';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-atendimento-novo',
  templateUrl: './atendimento-novo.component.html',
  styleUrls: ['./atendimento-novo.component.scss']
})
export class AtendimentoNovoComponent implements OnInit {

  temaPrimario: NgxMaterialTimepickerTheme;
  atendimentoForm: FormGroup;

  constructor(public location: Location
    , formBuilder: FormBuilder) {
    this.temaPrimario = TEMA_PRIMARIO;
    this.atendimentoForm = formBuilder.group({
      paciente: [''],
      responsavel: [''],
      contato: [''],
      inicioData: [''],
      inicioHora: ['']
    });
  }

  ngOnInit() {
  }

}
