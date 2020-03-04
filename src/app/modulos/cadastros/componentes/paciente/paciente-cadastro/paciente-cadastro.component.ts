import { SIGLAS_ESTADOS } from './../../../../../constantes/estados';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-paciente-cadastro',
  templateUrl: './paciente-cadastro.component.html',
  styleUrls: ['./paciente-cadastro.component.scss']
})
export class PacienteCadastroComponent implements OnInit, OnDestroy {

  pacienteForm: FormGroup;
  formSubscription: Subscription;
  estados = SIGLAS_ESTADOS;

  constructor(private formBuilder: FormBuilder,
    public location: Location,
    private route: ActivatedRoute,
    private router: Router) {
    this.pacienteForm = formBuilder.group({
      paciente_id: [0],
      nome_completo: [null, Validators.required],
      sexo: [null, Validators.required],
      email: [null, Validators.email],
      data_nascimento: [null],
      telefones: formBuilder.array([]),
      enderecos: formBuilder.array([]),
      responsaveis: formBuilder.array([])
    });
  }

  ngOnInit() {
    this.pacienteForm.controls.data_nascimento.disable();
    const pacienteId = this.route.snapshot.paramMap.get('paciente_id');
    if (pacienteId) {
      this.pacienteForm.controls.paciente_id.setValue(
        Number.parseInt(pacienteId, 10)
      );
    }
  }

  ngOnDestroy() {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }

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
      telefone: ['', Validators.compose([
        Validators.required, Validators.pattern(/(?:\()[0-9]{2}(?:\))\s?[0-9]{4,5}(?:-)[0-9]{4}$/)
      ])],
      tipo: [0, Validators.required],
      telefone_paciente_id: [0],
      paciente: [0]
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

  salvar() {
    this.router.navigate([`cadastros/pacientes/${1}`]);
  }

}
