import { FlexLayoutModule } from '@angular/flex-layout';
import { AcessoRoutingModule } from './acesso-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcessarComponent } from './componentes/acessar/acessar.component';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [AcessarComponent],
  imports: [
    CommonModule,
    AcessoRoutingModule,
    MatButtonModule,
    FlexLayoutModule
  ]
})
export class AcessoModule { }
