import { SessoesListaRoutingModule } from './sessoes-lista-routing.module';
import { SessoesListaComponent } from './sessoes-lista/sessoes-lista.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SessoesListaComponent],
  imports: [
    CommonModule,
    SessoesListaRoutingModule
  ]
})
export class SessoesListaModule { }
