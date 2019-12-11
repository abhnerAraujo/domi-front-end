import { MomentService } from './../../../compartilhado/services/moment/moment.service';
import { TimelineModule } from './../../../compartilhado/componentes/timeline/timeline.module';
import { PipesModule } from './../../../../pipes/pipes.module';
import { ChartModule } from 'primeng/chart';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SessoesListaRoutingModule } from './sessoes-lista-routing.module';
import { SessoesListaComponent } from './sessoes-lista/sessoes-lista.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule, MatDividerModule } from '@angular/material';

@NgModule({
  declarations: [SessoesListaComponent],
  imports: [
    CommonModule,
    SessoesListaRoutingModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    ChartModule,
    PipesModule,
    MatDividerModule,
    TimelineModule
  ],
  providers: [
    MomentService
  ]
})
export class SessoesListaModule { }
