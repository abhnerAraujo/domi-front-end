import { AtendimentosService } from './../../../../services/atendimentos/atendimentos.service';
import {
  PacientesService
} from './../../../../../cadastros/componentes/paciente/services/pacientes/pacientes.service';
import {
  Paciente
} from './../../../../../cadastros/componentes/paciente/interfaces/listar-pacientes-response.interface';
import { DialogoPacienteComponent } from './../dialogo-paciente/dialogo-paciente.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { TEMA_PRIMARIO } from './../../../../../../constantes/time-picker';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-atendimento-novo',
  templateUrl: './atendimento-novo.component.html',
  styleUrls: ['./atendimento-novo.component.scss']
})
export class AtendimentoNovoComponent implements OnInit {

  temaPrimario: NgxMaterialTimepickerTheme;
  atendimentoForm: FormGroup;

  pacientes: Paciente[];
  pacientesFiltrados: Observable<Paciente[]>;

  constructor(public location: Location
    , formBuilder: FormBuilder
    , private router: Router
    , private dialog: MatDialog
    , private pacientesService: PacientesService
    , private atendimentoService: AtendimentosService
    , private snackbar: MatSnackBar) {
    this.temaPrimario = TEMA_PRIMARIO;
    this.atendimentoForm = formBuilder.group({
      paciente: [null, Validators.compose([
        Validators.required, this.pacienteValidator()
      ])],
      data_inicio: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  ngOnInit() {
    this.carregarListaPacientes();
  }

  carregarListaPacientes(pacienteId?: number) {
    this.pacientesService.listar({ em_atendimento: 0 })
      .subscribe(resultado => {
        this.pacientes = resultado.dados;
        this.pacientesFiltrados = this.atendimentoForm.get('paciente').valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.nome),
            map(paciente => paciente ? this._filter(paciente) : this.pacientes.slice())
          );
        if (!!pacienteId) {
          this.atendimentoForm.controls.paciente.setValue(
            this.pacientes.find(paciente => paciente.paciente_id === pacienteId));
        }
      });
  }

  private _filter(value: string): Paciente[] {
    const filterValue = value.toLowerCase();

    return this.pacientes.filter(paciente => paciente.nome_completo.toLowerCase().includes(filterValue));
  }

  displayFn(paciente?: Paciente): string | undefined {
    return paciente ? paciente.nome_completo : undefined;
  }

  criar() {
    const formValue = this.atendimentoForm.value;
    this.atendimentoForm.disable();
    this.atendimentoService.criar({
      paciente: formValue.paciente.paciente_id,
      data_inicio: formValue.data_inicio.toISOString()
    }).subscribe(resultado => {
      this.router.navigate([`atendimentos/${resultado.dados.atendimento_id}/sessoes/nova`]);
    },
      erro => this.snackbar.open(erro.mensagem, 'OK', { duration: 5000 }),
      () => this.atendimentoForm.enable());
  }

  cadastrarPaciente(pacienteId?: number) {
    this.dialog.open(DialogoPacienteComponent, {
      minWidth: 320,
      data: !!pacienteId ? pacienteId : null
    }).afterClosed()
      .subscribe(resultado => {
        if (resultado) {
          this.carregarListaPacientes(resultado);
        }
      });
  }

  pacienteValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!!control && !!control.value && typeof control.value === 'string') {
        return { paciente: { razao: 'Paciente não existe' } };
      }
      return null;
    };
  }

}
