import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import {
  MatButtonModule, MatDividerModule, MatIconModule, MatCardModule, MatFormFieldModule, MatInputModule,
  MatAutocompleteModule,
  MatDatepickerModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AtendimentoNovoRoutingModule } from './atendimento-novo-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtendimentoNovoComponent } from './componentes/atendimento-novo/atendimento-novo.component';

@NgModule({
  declarations: [AtendimentoNovoComponent],
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
    ReactiveFormsModule
  ]
})
export class AtendimentoNovoModule { }
