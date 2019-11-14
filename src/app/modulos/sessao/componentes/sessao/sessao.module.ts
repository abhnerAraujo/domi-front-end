import { SessaoRoutingModule } from './sessao-routing.module';
import { SessaoComponent } from './componentes/sessao/sessao.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SessaoComponent],
  imports: [
    CommonModule,
    SessaoRoutingModule
  ]
})
export class SessaoModule { }
