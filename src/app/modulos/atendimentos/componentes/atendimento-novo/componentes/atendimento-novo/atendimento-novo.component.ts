import {
  PacientesService
} from './../../../../../cadastros/componentes/paciente/services/pacientes/pacientes.service';
import {
  Paciente
} from './../../../../../cadastros/componentes/paciente/interfaces/listar-pacientes-response.interface';
import { DialogoPacienteComponent } from './../dialogo-paciente/dialogo-paciente.component';
import { MatDialog } from '@angular/material';
import { TEMA_PRIMARIO } from './../../../../../../constantes/time-picker';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
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
    , private pacientesService: PacientesService) {
    this.temaPrimario = TEMA_PRIMARIO;
    this.atendimentoForm = formBuilder.group({
      paciente: [null],
      inicioData: [''],
      inicioHora: ['']
    });
  }

  ngOnInit() {
    this.pacientesService.listar({ em_atendimento: 0 })
      .subscribe(resultado => {
        this.pacientes = resultado.dados;
        this.pacientesFiltrados = this.atendimentoForm.get('paciente').valueChanges
          .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.nome),
            map(paciente => paciente ? this._filter(paciente) : this.pacientes.slice())
          );
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
    // this.router.navigate(['atendimentos/1/sessoes/nova']);
    console.log(this.atendimentoForm.value);
  }

  cadastrarPaciente(pacienteId?: number) {
    this.dialog.open(DialogoPacienteComponent, {
      minWidth: 320,
      data: !!pacienteId ? pacienteId : null
    }).afterClosed()
      .subscribe(resultado => {
        this.pacientesService.listar({ em_atendimento: 0 })
          .subscribe(response => {
            this.pacientes = response.dados;
          });
      });
  }

}
