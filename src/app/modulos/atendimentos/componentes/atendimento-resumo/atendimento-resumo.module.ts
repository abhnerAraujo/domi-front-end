import { AtendimentoResumoRoutingModule } from './atendimento-resumo-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtendimentoResumoComponent } from './componentes/atendimento-resumo/atendimento-resumo.component';

@NgModule({
  declarations: [AtendimentoResumoComponent],
  imports: [
    CommonModule,
    AtendimentoResumoRoutingModule
  ]
})
export class AtendimentoResumoModule { }
