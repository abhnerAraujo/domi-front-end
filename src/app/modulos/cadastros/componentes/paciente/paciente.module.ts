import { MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PacienteRoutingModule } from './paciente-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacientesListaComponent } from './pacientes-lista/pacientes-lista.component';



@NgModule({
  declarations: [PacientesListaComponent],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    FlexLayoutModule,
    MatIconModule
  ]
})
export class PacienteModule { }
