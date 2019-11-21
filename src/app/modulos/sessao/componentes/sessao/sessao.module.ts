import { BottomSheetNavegacaoModule } from './../../../compartilhado/componentes/bottom-sheet-navegacao/bottom-sheet-navegacao.module';
import { MatButtonModule, MatIconModule, MatDividerModule, MatProgressBarModule, MatBottomSheetModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SessaoRoutingModule } from './sessao-routing.module';
import { SessaoComponent } from './componentes/sessao/sessao.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SessaoComponent],
  imports: [
    CommonModule,
    SessaoRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressBarModule,
    BottomSheetNavegacaoModule
  ]
})
export class SessaoModule { }
