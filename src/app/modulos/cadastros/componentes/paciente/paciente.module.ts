import { ResponsavelTiposService } from './services/responsavel-tipos/responsavel-tipos.service';
import { PipesModule } from './../../../../pipes/pipes.module';
import { PacientesService } from './services/pacientes/pacientes.service';
import {
  MatIconModule, MatDividerModule, MatButtonModule, MatFormFieldModule, MatInputModule,
  MatSelectModule, MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE, MatListModule, MatSnackBarModule
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PacienteRoutingModule } from './paciente-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacientesListaComponent } from './pacientes-lista/pacientes-lista.component';
import { PacienteCadastroComponent } from './paciente-cadastro/paciente-cadastro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

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
    MatMomentDateModule,
    MatListModule,
    PipesModule,
    NgxMaskModule.forRoot(null),
    MatSnackBarModule
  ],
  providers: [
    PacientesService,
    ResponsavelTiposService
  ]
})
export class PacienteModule { }
