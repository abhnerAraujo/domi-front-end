import { AtendimentosListaRoutingModule } from './atendimentos-lista-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogAdicionarEventoComponent } from './componentes/dialog-adicionar-evento/dialog-adicionar-evento.component';
import { AtendimentosListaComponent } from './componentes/atendimentos-lista/atendimentos-lista.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatIconModule, MatDividerModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatDialogModule,
  MatSnackBarModule
} from '@angular/material';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@NgModule({
  declarations: [AtendimentosListaComponent, DialogAdicionarEventoComponent],
  imports: [
    CommonModule,
    AtendimentosListaRoutingModule,
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
export class AtendimentosListaModule { }
