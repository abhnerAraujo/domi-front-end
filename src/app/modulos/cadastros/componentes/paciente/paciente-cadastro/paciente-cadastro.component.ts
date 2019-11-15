import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-paciente-cadastro',
  templateUrl: './paciente-cadastro.component.html',
  styleUrls: ['./paciente-cadastro.component.scss']
})
export class PacienteCadastroComponent implements OnInit {

  pacienteForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public location: Location) {
    this.pacienteForm = formBuilder.group({
      telefones: formBuilder.array([])
    });
  }

  ngOnInit() {
    this.addTelefone();
  }

  get fones() {
    return this.pacienteForm.controls.telefones as FormArray;
  }

  addTelefone() {
    this.fones.push(this.formBuilder.group({
      numero: [''],
      tipo: [0]
    }));
  }

  removerTelefone(index: number) {
    this.fones.removeAt(index);
  }

}
