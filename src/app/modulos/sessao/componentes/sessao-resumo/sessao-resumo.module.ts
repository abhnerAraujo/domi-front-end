import { TiposPagamentoService } from './../../services/tipos-pagamento/tipos-pagamento.service';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { SessaoResumoRoutingModule } from './sessao-resumo-routing.module';
import { SessaoResumoComponent } from './sessao-resumo/sessao-resumo.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatIconModule, MatButtonModule, MatFormFieldModule, MatCheckboxModule, MatInputModule, MatDividerModule,
  MatSnackBarModule, MatListModule, MatBadgeModule, MatExpansionModule, MatDatepickerModule, MatSelectModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../../../pipes/pipes.module';
import { SessaoService } from '../../services/sessao/sessao.service';
import { MomentService } from '../../../compartilhado/services/moment/moment.service';

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
    PipesModule,
    MatSnackBarModule,
    MatListModule,
    MatBadgeModule,
    MatExpansionModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule.setLocale('pt-BR'),
    CurrencyMaskModule,
    MatSelectModule
  ],
  providers: [
    SessaoService,
    MomentService,
    TiposPagamentoService
  ]
})
export class SessaoResumoModule { }
