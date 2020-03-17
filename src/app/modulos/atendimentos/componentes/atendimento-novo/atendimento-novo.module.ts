import { AtendimentosService } from './../../services/atendimentos/atendimentos.service';
import { PacientesService } from './../../../cadastros/componentes/paciente/services/pacientes/pacientes.service';
import { PacienteModule } from './../../../cadastros/componentes/paciente/paciente.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import {
  MatButtonModule, MatDividerModule, MatIconModule, MatCardModule, MatFormFieldModule, MatInputModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatDialogModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AtendimentoNovoRoutingModule } from './atendimento-novo-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtendimentoNovoComponent } from './componentes/atendimento-novo/atendimento-novo.component';
import { DialogoPacienteComponent } from './componentes/dialogo-paciente/dialogo-paciente.component';

@NgModule({
  declarations: [AtendimentoNovoComponent, DialogoPacienteComponent],
  imports: [
    CommonModule,
    AtendimentoNovoRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule.setLocale('pt-BR'),
    ReactiveFormsModule,
    MatDialogModule,
    PacienteModule
  ],
  entryComponents: [
    DialogoPacienteComponent
  ],
  providers: [
    PacientesService,
    AtendimentosService
  ]
})
export class AtendimentoNovoModule { }
