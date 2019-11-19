import { DialogConfigDiaAtendimentoComponent } from './componentes/dialog-config-dia-atendimento/dialog-config-dia-atendimento.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule, MatIconModule, MatChipsModule, MatSliderModule, MatSnackBarModule, MatDialogModule,
  MatInputModule, MatFormFieldModule, MatButtonToggleModule, MatDividerModule
} from '@angular/material';
import { AtendimentoConfiguracaoRoutingModule } from './atendimento-configuracao-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtendimentoConfiguracaoComponent } from './componentes/atendimento-configuracao/atendimento-configuracao.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  declarations: [AtendimentoConfiguracaoComponent, DialogConfigDiaAtendimentoComponent],
  imports: [
    CommonModule,
    AtendimentoConfiguracaoRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSliderModule,
    NgxMaterialTimepickerModule.setLocale('pt-BR'),
    MatButtonToggleModule,
    MatDividerModule,
    CurrencyMaskModule,
    FormsModule
  ],
  entryComponents: [
    DialogConfigDiaAtendimentoComponent
  ]
})
export class AtendimentoConfiguracaoModule { }
