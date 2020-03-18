import { SexoPipe } from './sexo/sexo.pipe';
import { MomentService } from './../modulos/compartilhado/services/moment/moment.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoedaPipe } from './moeda/moeda.pipe';
import { DiaSemanaPipe } from './dia-semana/dia-semana.pipe';
import { HoraPipe } from './hora/hora.pipe';
import { TipoArtefatoPipe } from './tipo-artefato/tipo-artefato.pipe';
import { DataHoraPipe } from './data-hora/data-hora.pipe';
import { IdadePipe } from './idade/idade.pipe';
import { TipoTelefonePipe } from './tipo-telefone/tipo-telefone.pipe';
import { TipoResponsavelPipe } from './tipo-responsavel/tipo-responsavel.pipe';

@NgModule({
  declarations: [
    MoedaPipe,
    DiaSemanaPipe,
    HoraPipe,
    TipoArtefatoPipe,
    DataHoraPipe,
    IdadePipe,
    SexoPipe,
    TipoTelefonePipe,
    TipoResponsavelPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MoedaPipe,
    DiaSemanaPipe,
    HoraPipe,
    DataHoraPipe,
    IdadePipe,
    SexoPipe,
    TipoTelefonePipe,
    TipoResponsavelPipe
  ],
  providers: [
    MomentService
  ]
})
export class PipesModule { }
