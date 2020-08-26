import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatIconModule, MatDialogModule, MatButtonModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogoSelecaoComponent } from './componentes/dialogo-selecao/dialogo-selecao.component';



@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatDialogModule,
    NgxDropzoneModule,
    MatButtonModule
  ],
  declarations: [DialogoSelecaoComponent],
  exports: [DialogoSelecaoComponent],
  entryComponents: [DialogoSelecaoComponent],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { panelClass: 'mat-dialog-override' } }
  ]
})
export class SelecaoImagemModule { }
