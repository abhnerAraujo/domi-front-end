import { FlexLayoutModule } from '@angular/flex-layout';
import { AtendimentosRoutingModule } from './atendimentos-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtendimentosListaComponent } from './componentes/atendimentos-lista/atendimentos-lista.component';
import { MatIconModule, MatDividerModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [AtendimentosListaComponent],
  imports: [
    CommonModule,
    AtendimentosRoutingModule,
    FlexLayoutModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule
  ]
})
export class AtendimentosModule { }
