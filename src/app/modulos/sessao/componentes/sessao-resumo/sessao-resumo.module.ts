import { SessaoResumoRoutingModule } from './sessao-resumo-routing.module';
import { SessaoResumoComponent } from './sessao-resumo/sessao-resumo.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SessaoResumoComponent],
  imports: [
    CommonModule,
    SessaoResumoRoutingModule
  ]
})
export class SessaoResumoModule { }
