import { MatButtonModule, MatDividerModule } from '@angular/material';
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
    MatDividerModule
  ]
})
export class AtendimentoNovoModule { }
