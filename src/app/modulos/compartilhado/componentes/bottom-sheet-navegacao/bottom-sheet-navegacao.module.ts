import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomSheetNavegacaoComponent } from './bottom-sheet-navegacao.component';
import { MatBottomSheetModule, MatListModule, MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BottomSheetNavegacaoComponent],
  imports: [
    CommonModule,
    MatBottomSheetModule,
    MatListModule,
    MatIconModule,
    RouterModule
  ],
  exports: [BottomSheetNavegacaoComponent],
  entryComponents: [BottomSheetNavegacaoComponent]
})
export class BottomSheetNavegacaoModule { }
