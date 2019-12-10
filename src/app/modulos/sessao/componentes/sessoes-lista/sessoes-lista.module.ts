import { PipesModule } from './../../../../pipes/pipes.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SessoesListaRoutingModule } from './sessoes-lista-routing.module';
import { SessoesListaComponent } from './sessoes-lista/sessoes-lista.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  declarations: [SessoesListaComponent],
  imports: [
    CommonModule,
    SessoesListaRoutingModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    PipesModule
  ]
})
export class SessoesListaModule { }
