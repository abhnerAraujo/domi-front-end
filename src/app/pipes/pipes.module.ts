import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoedaPipe } from './moeda/moeda.pipe';
import { DiaSemanaPipe } from './dia-semana/dia-semana.pipe';
import { HoraPipe } from './hora/hora.pipe';
import { TipoArtefatoPipe } from './tipo-artefato/tipo-artefato.pipe';
import { DataHoraPipe } from './data-hora/data-hora.pipe';

@NgModule({
  declarations: [
    MoedaPipe,
    DiaSemanaPipe,
    HoraPipe,
    TipoArtefatoPipe,
    DataHoraPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MoedaPipe,
    DiaSemanaPipe,
    HoraPipe,
    DataHoraPipe
  ]
})
export class PipesModule { }
