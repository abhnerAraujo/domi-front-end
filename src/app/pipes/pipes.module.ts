import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoedaPipe } from './moeda/moeda.pipe';
import { DiaSemanaPipe } from './dia-semana/dia-semana.pipe';
import { HoraPipe } from './hora/hora.pipe';

@NgModule({
  declarations: [
    MoedaPipe,
    DiaSemanaPipe,
    HoraPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MoedaPipe,
    DiaSemanaPipe,
    HoraPipe
  ]
})
export class PipesModule { }
