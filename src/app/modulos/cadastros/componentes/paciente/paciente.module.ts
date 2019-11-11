import {
  MatIconModule, MatDividerModule, MatButtonModule, MatFormFieldModule, MatInputModule,
  MatSelectModule, MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PacienteRoutingModule } from './paciente-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacientesListaComponent } from './pacientes-lista/pacientes-lista.component';
import { PacienteCadastroComponent } from './paciente-cadastro/paciente-cadastro.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PacientesListaComponent, PacienteCadastroComponent],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    FlexLayoutModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ]
})
export class PacienteModule { }
