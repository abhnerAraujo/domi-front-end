import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { REGEX_TELEFONE } from './../../../../../constantes/valores';
import { Paciente, Endereco, Telefone, Responsavel } from './../interfaces/detalher-paciente-response.interface';
import { ResponsavelTipo } from './../interfaces/listar-responsavel-tipos-response.interface';
import { ResponsavelTiposService } from './../services/responsavel-tipos/responsavel-tipos.service';
import { PacientesService } from './../services/pacientes/pacientes.service';
import { MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';
import { LOCAL_STORAGE_ITENS } from './../../../../../constantes/config';
import { DadosUsuario } from './../../../../acesso/interfaces/dados-usuario-response.interface';
import { SalvarPacienteRequest } from './../interfaces/salvar-paciente-request.interface';
import { SIGLAS_ESTADOS } from './../../../../../constantes/estados';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
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
  regexTelfone = REGEX_TELEFONE;
  responsavelTipos: ResponsavelTipo[];
  processando: boolean;
  dialogRef: any;
  edicao: boolean;
  alinhadoDireita: boolean;
  mediaQuerySubscription: Subscription;
  activeMediaQuery: string;

  @Input()
  set dialogo(value: MatDialogRef<any>) {
    this.dialogRef = value;
  }

  @Input() pacienteId: number;

  constructor(private formBuilder: FormBuilder,
    public location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private pacienteService: PacientesService,
    private responsavelTiposService: ResponsavelTiposService,
    private mediaObserver: MediaObserver) {
    this.mediaQuerySubscription = this.mediaObserver.asObservable().subscribe(
      (change: MediaChange[]) => this.activeMediaQuery = change[0].mqAlias
    );
    this.processando = true;
    this.edicao = false;
    this.alinhadoDireita = true;
  }

  ngOnInit() {
    const paciente = Number.parseInt(this.route.snapshot.paramMap.get('paciente_id'), 10) || this.pacienteId || 0;
    this.edicao = !!this.dialogRef;
    if (paciente) {
      this.carregarPaciente(paciente);
    } else {
      this.criarForm();
      this.edicao = true;
    }
  }

  mascaraTelefones(control: AbstractControl) {
    let value: string = control.value;
    if (!!value) {
      value = value.replace(/[\D]/g, '');
      value = value.replace(/^(\d{2})(\d)/g, '$1 $2');
      value = value.replace(/(\d)(\d{4})$/g, '$1-$2');
      control.setValue(value);
    }
  }

  telefoneValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!!control && !!control.value) {
        const valor: string = control.value;
        return valor.match(REGEX_TELEFONE)
          ? null
          : { telefone: true };
      }
      return null;
    };
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
        const dados: Paciente = resultado.dados;
        this.criarForm(dados);
      },
        error => this.snackbar.open(error.mensagem || 'Erro ao carregar paciente', 'Ok', { duration: 5000 }));
  }

  criarForm(dados?: Paciente) {
    this.pacienteForm = this.formBuilder.group({
      paciente_id: [!!dados ? dados.paciente_id : 0],
      nome_completo: [!!dados ? dados.nome_completo : null, Validators.required],
      sexo: [!!dados ? dados.sexo : null, Validators.required],
      email: [!!dados ? dados.email : null, Validators.email],
      data_nascimento: [!!dados ? dados.data_nascimento : null],
      telefones: this.formBuilder.array([]),
      enderecos: this.formBuilder.array([]),
      responsaveis: this.formBuilder.array([])
    });
    if (!!dados && dados.responsaveis) {
      dados.responsaveis.forEach(r => this.addResponsavel(r));
    }
    if (!!dados && dados.enderecos) {
      dados.enderecos.forEach(e => this.addEndereco(e));
    }
    if (!!dados && dados.telefones) {
      dados.telefones.forEach(t => this.addTelefone(t));
    }
    this.processando = false;
    setTimeout(() => {
      this.carregarResponsavelTipos();
    });
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

  addTelefone(telefone?: Telefone) {
    if (!this.fones.valid && this.fones.length > 0) {
      const index = this.fones.controls.findIndex(control => !control.valid);
      this.snackbar.open(`O telefone ${index + 1} está inválido ou incompleto`, 'OK', { duration: 5000 });
    } else {
      this.fones.push(this.formBuilder.group({
        telefone: [!!telefone ? telefone.telefone : null, Validators.compose([
          Validators.required, this.telefoneValidator()
        ])],
        tipo: [!!telefone ? telefone.tipo : 'C', Validators.required],
        telefone_paciente_id: [!!telefone ? telefone.telefone_paciente_id : 0],
        excluido: [false]
      }));
    }
    if (this.fones.length) {
      this.mascaraTelefones(this.fones.at(this.fones.length - 1).get('telefone'));
    }
  }

  addEndereco(endereco?: Endereco) {
    if (!this.enderecos.valid && this.enderecos.length > 0) {
      const index = this.enderecos.controls.findIndex(control => !control.valid);
      this.snackbar.open(`O endereço ${index + 1} está inválido ou incompleto`, 'OK', { duration: 5000 });
    } else {
      this.enderecos.push(this.formBuilder.group({
        endereco_paciente_id: [!!endereco ? endereco.endereco_paciente_id : null],
        logradouro: [!!endereco ? endereco.logradouro : null, Validators.compose([
          Validators.required
        ])],
        numero: [!!endereco ? endereco.numero : null],
        complemento: [!!endereco ? endereco.complemento : null],
        cep: [!!endereco ? endereco.cep : null],
        bairro: [!!endereco ? endereco.bairro : null],
        cidade: [!!endereco ? endereco.cidade : null],
        estado: [!!endereco ? endereco.estado : null],
        excluido: [false]
      }));
    }
  }

  addResponsavel(responsavel?: Responsavel) {
    if (!this.responsaveis.valid && this.responsaveis.length > 0) {
      const index = this.responsaveis.controls.findIndex(control => !control.valid);
      this.snackbar.open(`O responsável ${index + 1} está inválido ou incompleto`, 'OK', { duration: 5000 });
    } else {
      this.responsaveis.push(this.formBuilder.group({
        paciente_responsavel_id: [!!responsavel ? responsavel.paciente_responsavel_id : null],
        nome_responsavel: [!!responsavel ? responsavel.nome_responsavel : null, Validators.required],
        responsavel_tipo: [!!responsavel ? responsavel.responsavel_tipo : null],
        telefone_responsavel: [!!responsavel ? responsavel.telefone_responsavel : null, Validators.compose([
          this.telefoneValidator()
        ])],
        tipo_telefone_responsavel: [!!responsavel ? responsavel.tipo_telefone_responsavel : 'C'],
        excluido: [false]
      }));
    }
    if (!!this.responsaveis.length) {
      this.mascaraTelefones(this.responsaveis.at(this.responsaveis.length - 1).get('telefone_responsavel'));
    }
  }

  stringfy(valor) {
    return JSON.stringify(valor);
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
    this.processando = true;
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
          paciente_responsavel_id: responsavel.paciente_responsavel_id
            ? responsavel.paciente_responsavel_id : undefined,
          nome_responsavel: responsavel.nome_responsavel,
          responsavel_tipo: responsavel.responsavel_tipo,
          telefone_responsavel: !!responsavel.telefone_responsavel ?
            responsavel.telefone_responsavel.replace(/\D/g, '') : undefined,
          tipo_telefone_responsavel: responsavel.tipo_telefone_responsavel,
          excluido: responsavel.excluido
        };
      });
    }
    if (!!formValue.telefones && formValue.telefones.length) {
      request.telefones = formValue.telefones.map(telefone => {
        return {
          telefone_paciente_id: telefone.telefone_paciente_id ? telefone.telefone_paciente_id : undefined,
          telefone: !!telefone.telefone ? telefone.telefone.replace(/\D/g, '') : undefined,
          tipo: telefone.tipo,
          excluido: telefone.excluido
        };
      });
    }
    if (!!formValue.enderecos && formValue.enderecos.length) {
      request.enderecos = formValue.enderecos.map(endereco => {
        return {
          endereco_paciente_id: endereco.endereco_paciente_id ? endereco.endereco_paciente_id : undefined,
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
          if (!!this.dialogRef) {
            this.dialogRef.close(formValue.paciente_id);
          } else {
            this.router.navigate([`cadastros/pacientes/${formValue.paciente_id}`]);
          }
        },
          error => this.snackbar.open(error.mensagem, 'Ok', { duration: 5000 }),
          () => this.processando = false);
    } else {
      this.pacienteService.criar(request)
        .subscribe(resposta => {
          this.snackbar.open('Paciente salvo com sucesso', 'Ok', { duration: 5000 });
          if (!!this.dialogRef) {
            this.dialogRef.close(resposta.dados.paciente_id);
          } else {
            this.router.navigate([`cadastros/pacientes/${resposta.dados.paciente_id}`]);
          }
        },
          error => this.snackbar.open(error.mensagem, 'Ok', { duration: 5000 }),
          () => this.processando = false);
    }
  }

  mascara(control: (AbstractControl | string)) {
    if (typeof control === 'string') {
      return (control === 'F')
        ? '00 0000-0000'
        : '00 00000-0000';
    } else {
      return (control.value === 'F')
        ? '00 0000-0000'
        : '00 00000-0000';
    }
  }

  imprimir() {
    window.print();
  }

  telaPequena = () => this.activeMediaQuery === 'xs' || this.activeMediaQuery === 'sm';

}
