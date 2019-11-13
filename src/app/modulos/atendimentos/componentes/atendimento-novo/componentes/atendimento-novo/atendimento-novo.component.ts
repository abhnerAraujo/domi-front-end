import { TEMA_PRIMARIO } from './../../../../../../constantes/time-picker';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


export interface Paciente {
  id: number;
  nome: string;
}

@Component({
  selector: 'app-atendimento-novo',
  templateUrl: './atendimento-novo.component.html',
  styleUrls: ['./atendimento-novo.component.scss']
})
export class AtendimentoNovoComponent implements OnInit {

  temaPrimario: NgxMaterialTimepickerTheme;
  atendimentoForm: FormGroup;

  pacientes: Paciente[] = [
    { id: 1, nome: 'Marcus Felipe' },
    { id: 2, nome: 'Maria Atonieta' },
    { id: 1, nome: 'Sara Dias' },
  ];
  pacientesFiltrados: Observable<Paciente[]>;

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
    this.pacientesFiltrados = this.atendimentoForm.get('paciente').valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nome),
        map(paciente => paciente ? this._filter(paciente) : this.pacientes.slice())
      );
  }

  private _filter(value: string): Paciente[] {
    const filterValue = value.toLowerCase();

    return this.pacientes.filter(paciente => paciente.nome.toLowerCase().includes(filterValue));
  }

  displayFn(paciente?: Paciente): string | undefined {
    return paciente ? paciente.nome : undefined;
  }

}
