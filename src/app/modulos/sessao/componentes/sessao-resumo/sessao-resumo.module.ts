import { SessaoResumoRoutingModule } from './sessao-resumo-routing.module';
import { SessaoResumoComponent } from './sessao-resumo/sessao-resumo.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatButtonModule, MatFormFieldModule, MatCheckboxModule, MatInputModule, MatDividerModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../../../pipes/pipes.module';
import { SessaoService } from '../../services/sessao/sessao.service';
import { MomentService } from '../../../compartilhado/services/moment/moment.service';
import { HoraPipe } from 'src/app/pipes/hora/hora.pipe';

@NgModule({
  declarations: [SessaoResumoComponent],
  imports: [
    CommonModule,
    SessaoResumoRoutingModule,
    FlexLayoutModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    PipesModule
  ],
  providers: [
    SessaoService,
    MomentService,
    HoraPipe
  ]
})
export class SessaoResumoModule { }
