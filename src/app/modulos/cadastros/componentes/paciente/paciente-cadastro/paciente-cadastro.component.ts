import { ResponsavelTipo } from './../interfaces/listar-responsavel-tipos-response.interface';
import { ResponsavelTiposService } from './../services/responsavel-tipos/responsavel-tipos.service';
import { PacientesService } from './../services/pacientes/pacientes.service';
import { MatSnackBar } from '@angular/material';
import { LOCAL_STORAGE_ITENS } from './../../../../../constantes/config';
import { DadosUsuario } from './../../../../acesso/interfaces/dados-usuario-response.interface';
import { SalvarPacienteRequest } from './../interfaces/salvar-paciente-request.interface';
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
  responsavelTipos: ResponsavelTipo[];

  constructor(private formBuilder: FormBuilder,
    public location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private pacienteService: PacientesService,
    private responsavelTiposService: ResponsavelTiposService) {
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
    this.pacienteForm.disable();
    const pacienteId = this.route.snapshot.paramMap.get('paciente_id');
    if (pacienteId) {
      this.carregarPaciente(Number.parseInt(pacienteId, 10));
      this.carregarResponsavelTipos();
    }
  }

  carregarResponsavelTipos() {
    this.responsavelTiposService.listar()
      .subscribe(resultado => {
        this.responsavelTipos = resultado.dados;
      }, erro => this.snackbar.open(erro.mensagem || 'Erro ao carregar tipos', 'Ok', { duration: 5000 }));
  }

  async carregarPaciente(pacienteId: number) {
    this.pacienteService.detalhar(pacienteId)
      .subscribe(resultado => {
        this.pacienteForm.enable();
        this.pacienteForm.patchValue(resultado.dados);
      },
        error => this.snackbar.open(error.mensagem || 'Erro ao carregar paciente', 'Ok', { duration: 5000 }));
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
    if (!this.fones.valid && this.fones.length > 0) {
      const index = this.fones.controls.findIndex(control => !control.valid);
      this.snackbar.open(`O telefone ${index + 1} está inválido ou incompleto`, 'OK', { duration: 5000 });
    } else {
      this.fones.push(this.formBuilder.group({
        telefone: ['', Validators.compose([
          Validators.required
        ])],
        tipo: [0, Validators.required],
        telefone_paciente_id: [0],
        paciente: [0],
        excluido: [false]
      }));
    }
  }

  addEndereco() {
    if (!this.enderecos.valid && this.enderecos.length > 0) {
      const index = this.enderecos.controls.findIndex(control => !control.valid);
      this.snackbar.open(`O endereço ${index + 1} está inválido ou incompleto`, 'OK', { duration: 5000 });
    } else {
      this.enderecos.push(this.formBuilder.group({
        endereco_paciente_id: [0],
        paciente: [''],
        logradouro: ['', Validators.compose([
          Validators.required
        ])],
        numero: [''],
        complemento: [''],
        cep: [''],
        bairro: [''],
        cidade: [''],
        estado: [''],
        excluido: [false]
      }));
    }
  }

  addResponsavel() {
    if (!this.responsaveis.valid && this.responsaveis.length > 0) {
      const index = this.responsaveis.controls.findIndex(control => !control.valid);
      this.snackbar.open(`O responsável ${index + 1} está inválido ou incompleto`, 'OK', { duration: 5000 });
    } else {
      this.responsaveis.push(this.formBuilder.group({
        paciente_responsavel_id: [0],
        nome_responsavel: [''],
        responsavel_tipo: [0],
        telefone_responsavel: [''],
        tipo_telefone_responsavel: [''],
        excluido: [false]
      }));
    }
  }

  removerTelefone(index: number) {
    if (this.fones.at(index).value.telefone_paciente_id) {
      this.fones.at(index).get('excluido').setValue(true);
    } else {
      this.fones.removeAt(index);
    }
  }

  removerEndereco(index: number) {
    if (this.enderecos.at(index).value.endereco_paciente_id) {
      this.enderecos.at(index).get('excluido').setValue(true);
    } else {
      this.enderecos.removeAt(index);
    }
  }

  removerResponsavel(index: number) {
    if (this.responsaveis.at(index).value.paciente_responsavel_id) {
      this.responsaveis.at(index).get('excluido').setValue(true);
    } else {
      this.responsaveis.removeAt(index);
    }
  }

  salvar() {
    const dadosUsuario: DadosUsuario = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ITENS.dados_usuario));
    const formValue = this.pacienteForm.value;
    const request: SalvarPacienteRequest = {
      data_nascimento: undefined,
      sexo: formValue.sexo,
      nome_completo: formValue.nome_completo,
      email: formValue.email,
      profissional_criador: dadosUsuario.perfis[0].profissional_id
    };
    if (!!formValue.data_nascimento && typeof formValue.data_nascimento === 'string') {
      request.data_nascimento = formValue.data_nascimento;
    } else if (!!formValue.data_nascimento) {
      request.data_nascimento = formValue.data_nascimento.toISOString();
    }
    if (!!formValue.responsaveis && formValue.responsaveis.length) {
      request.responsaveis = formValue.responsaveis.map(responsavel => {
        return {
          nome_responsavel: responsavel.nome_responsavel,
          responsavel_tipo: responsavel.responsavel_tipo,
          telefone_responsavel: responsavel.telefone_responsavel,
          tipo_telefone_responsavel: responsavel.tipo_telefone_responsavel,
          excluido: responsavel.excluido
        };
      });
    }
    if (!!formValue.telefones && formValue.telefones.length) {
      request.telefones = formValue.telefones.map(telefone => {
        return {
          telefone: telefone.telefone,
          tipo: telefone.tipo,
          excluido: telefone.excluido
        };
      });
    }
    if (!!formValue.enderecos && formValue.enderecos.length) {
      request.enderecos = formValue.enderecos.map(endereco => {
        return {
          logradouro: endereco.logradouro,
          numero: endereco.numero,
          complemento: endereco.complemento,
          cep: endereco.cep,
          bairro: endereco.bairro,
          cidade: endereco.cidade,
          estado: endereco.estado,
          excluido: endereco.excluido
        };
      });
    }
    if (formValue.paciente_id) {
      this.pacienteService.editar(formValue.paciente_id, request)
        .subscribe(resposta => {
          this.snackbar.open('Paciente editado com sucesso', 'Ok', { duration: 5000 });
          this.carregarPaciente(formValue.paciente_id);
        },
          error => this.snackbar.open(error.mensagem, 'Ok', { duration: 5000 }));
    } else {
      this.pacienteService.criar(request)
        .subscribe(resposta => {
          this.snackbar.open('Paciente salvo com sucesso', 'Ok', { duration: 5000 })
          this.router.navigate([`cadastros/pacientes/${resposta.dados.paciente_id}`]);
        },
          error => this.snackbar.open(error.mensagem, 'Ok', { duration: 5000 }));
    }
  }

}
