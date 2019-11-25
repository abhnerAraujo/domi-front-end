import { ReactiveFormsModule } from '@angular/forms';
import { BottomSheetNavegacaoModule } from './../../../compartilhado/componentes/bottom-sheet-navegacao/bottom-sheet-navegacao.module';
import {
  MatButtonModule, MatIconModule, MatDividerModule, MatProgressBarModule,
  MatFormFieldModule, MatInputModule, MatCheckboxModule, MatExpansionModule, MatDialogModule
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
    MatDialogModule
  ],
  entryComponents: [FinalizarSessaoComponent]
})
export class SessaoModule { }
