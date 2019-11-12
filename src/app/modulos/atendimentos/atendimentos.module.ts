import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AtendimentosRoutingModule } from './atendimentos-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtendimentosListaComponent } from './componentes/atendimentos-lista/atendimentos-lista.component';
import {
  MatIconModule, MatDividerModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatDialogModule,
  MatSnackBarModule
} from '@angular/material';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FullCalendarModule } from '@fullcalendar/angular';
import {
  DialogAdicionarEventoComponent
} from './componentes/atendimentos-lista/componentes/dialog-adicionar-evento/dialog-adicionar-evento.component';

@NgModule({
  declarations: [AtendimentosListaComponent, DialogAdicionarEventoComponent],
  imports: [
    CommonModule,
    AtendimentosRoutingModule,
    FlexLayoutModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    FullCalendarModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    NgxMaterialTimepickerModule.setLocale('pt-BR')
  ],
  entryComponents: [
    DialogAdicionarEventoComponent
  ]
})
export class AtendimentosModule { }
