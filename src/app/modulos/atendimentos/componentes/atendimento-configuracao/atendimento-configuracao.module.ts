import { PipesModule } from './../../../../pipes/pipes.module';
import {
  DialogConfigDiaAtendimentoModule
} from './../../../compartilhado/componentes/dialog-config-dia-atendimento/dialog-config-dia-atendimento.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule, MatIconModule, MatChipsModule, MatSnackBarModule,
  MatInputModule, MatFormFieldModule, MatButtonToggleModule, MatDividerModule
} from '@angular/material';
import { AtendimentoConfiguracaoRoutingModule } from './atendimento-configuracao-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtendimentoConfiguracaoComponent } from './componentes/atendimento-configuracao/atendimento-configuracao.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  declarations: [AtendimentoConfiguracaoComponent],
  imports: [
    CommonModule,
    AtendimentoConfiguracaoRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatDividerModule,
    CurrencyMaskModule,
    FormsModule,
    DialogConfigDiaAtendimentoModule,
    PipesModule
  ]
})
export class AtendimentoConfiguracaoModule { }
