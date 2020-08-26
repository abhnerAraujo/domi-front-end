import { ReactiveFormsModule } from '@angular/forms';
import { EspacosRoutingModule } from './espacos-routing.module';
import { MatButtonModule, MatIconModule, MatCardModule, MatDialogModule, MatDividerModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspacosListaComponent } from './componentes/espacos-lista/espacos-lista.component';
import { DialogAjudaComponent } from './componentes/dialog-ajuda/dialog-ajuda.component';

@NgModule({
  declarations: [EspacosListaComponent, DialogAjudaComponent],
  imports: [
    CommonModule,
    EspacosRoutingModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDividerModule
  ],
  entryComponents: [DialogAjudaComponent]
})
export class EspacosModule { }
