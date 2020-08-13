import { AgendamentosService } from './../../services/agendamentos/agendamentos.service';
import { AtendimentosAgendaRoutingModule } from './atendimentos-agenda-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogAdicionarEventoComponent } from './componentes/dialog-adicionar-evento/dialog-adicionar-evento.component';
import { AtendimentosAgendaComponent } from './componentes/atendimentos-agenda/atendimentos-agenda.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatIconModule, MatDividerModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatDialogModule,
  MatSnackBarModule,
  MatSliderModule,
  MatCardModule
} from '@angular/material';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@NgModule({
  declarations: [AtendimentosAgendaComponent, DialogAdicionarEventoComponent],
  imports: [
    CommonModule,
    AtendimentosAgendaRoutingModule,
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
    MatSliderModule,
    NgxMaterialTimepickerModule.setLocale('pt-BR'),
    MatCardModule
  ],
  entryComponents: [
    DialogAdicionarEventoComponent
  ],
  providers: [
    AgendamentosService
  ]
})
export class AtendimentosAgendaModule { }
