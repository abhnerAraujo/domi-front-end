import { EspacosRoutingModule } from './espacos-routing.module';
import { MatListModule, MatButtonModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspacosListaComponent } from './componentes/espacos-lista/espacos-lista.component';

@NgModule({
  declarations: [EspacosListaComponent],
  imports: [
    CommonModule,
    EspacosRoutingModule,
    FlexLayoutModule,
    MatListModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class EspacosModule { }
