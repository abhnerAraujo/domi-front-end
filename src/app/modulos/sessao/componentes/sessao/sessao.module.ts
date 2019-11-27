import { PipesModule } from './../../../../pipes/pipes.module';
import {
  DialogConfigDiaAtendimentoModule
} from './../../../compartilhado/componentes/dialog-config-dia-atendimento/dialog-config-dia-atendimento.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BottomSheetNavegacaoModule } from './../../../compartilhado/componentes/bottom-sheet-navegacao/bottom-sheet-navegacao.module';
import {
  MatButtonModule, MatIconModule, MatDividerModule, MatProgressBarModule,
  MatFormFieldModule, MatInputModule, MatCheckboxModule, MatExpansionModule, MatDialogModule
  , MatSliderModule, MatDatepickerModule, MatChipsModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SessaoRoutingModule } from './sessao-routing.module';
import { SessaoComponent } from './componentes/sessao/sessao.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinalizarSessaoComponent } from './componentes/finalizar-sessao/finalizar-sessao.component';

@NgModule({
  declarations: [SessaoComponent, FinalizarSessaoComponent],
  imports: [
    CommonModule,
    SessaoRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressBarModule,
    BottomSheetNavegacaoModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSliderModule,
    MatDatepickerModule,
    CurrencyMaskModule,
    DialogConfigDiaAtendimentoModule,
    MatChipsModule,
    PipesModule,
    FormsModule,
    CurrencyMaskModule
  ],
  entryComponents: [FinalizarSessaoComponent]
})
export class SessaoModule { }
