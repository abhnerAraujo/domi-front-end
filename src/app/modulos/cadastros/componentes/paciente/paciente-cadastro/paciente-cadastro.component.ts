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
      telefones: formBuilder.array([]),
      enderecos: formBuilder.array([]),
      responsaveis: formBuilder.array([])
    });
  }

  ngOnInit() { }

  get fones() {
    return this.pacienteForm.controls.telefones as FormArray;
  }

  get enderecos() {
    return this.pacienteForm.controls.enderecos as FormArray;
  }

  get responsaveis() {
    return this.pacienteForm.controls.responsaveis as FormArray;
  }

  addTelefone() {
    this.fones.push(this.formBuilder.group({
      numero: [''],
      tipo: [0]
    }));
  }

  addEndereco() {
    this.enderecos.push(this.formBuilder.group({
      endereco_paciente_id: [''],
      paciente: [''],
      logradouro: [''],
      numero: [''],
      complemento: [''],
      cep: [''],
      bairro: [''],
      cidade: [''],
      estado: ['']
    }));
  }

  addResponsavel() {
    this.responsaveis.push(this.formBuilder.group({
      nome_responsavel: [''],
      telefone_responsavel: [''],
      tipo_telefone_responsavel: ['']
    }));
  }

  removerTelefone(index: number) {
    this.fones.removeAt(index);
  }

  removerEndereco(index: number) {
    this.enderecos.removeAt(index);
  }

  removerResponsavel(index: number) {
    this.responsaveis.removeAt(index);
  }
}
