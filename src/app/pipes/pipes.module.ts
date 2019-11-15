import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoedaPipe } from './moeda/moeda.pipe';

@NgModule({
  declarations: [
    MoedaPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MoedaPipe
  ]
})
export class PipesModule { }
