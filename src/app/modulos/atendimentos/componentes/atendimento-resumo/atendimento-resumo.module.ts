import { MomentService } from 'src/app/modulos/compartilhado/services/moment/moment.service';
import { AtendimentosService } from './../../services/atendimentos/atendimentos.service';
import { PipesModule } from './../../../../pipes/pipes.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AtendimentoResumoRoutingModule } from './atendimento-resumo-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtendimentoResumoComponent } from './componentes/atendimento-resumo/atendimento-resumo.component';
import { MatDividerModule, MatCardModule, MatButtonModule, MatIconModule, MatListModule, MatSnackBarModule } from '@angular/material';
import { CountUpModule } from 'countup.js-angular2';
import { InformacaoNumericaComponent } from './componentes/informacao-numerica/informacao-numerica.component';

@NgModule({
  declarations: [AtendimentoResumoComponent, InformacaoNumericaComponent],
  imports: [
    CommonModule,
    AtendimentoResumoRoutingModule,
    FlexLayoutModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    PipesModule,
    MatSnackBarModule,
    CountUpModule
  ],
  providers: [
    AtendimentosService,
    MomentService
  ]
})
export class AtendimentoResumoModule { }
