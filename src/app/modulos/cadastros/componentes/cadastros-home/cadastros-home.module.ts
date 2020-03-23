import { CadastrosHomeRoutingModule } from './cadastros-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatButtonModule, MatListModule } from '@angular/material';
import { CadastrosHomeComponent } from './componentes/cadastros-home/cadastros-home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CadastrosHomeComponent],
  imports: [
    CommonModule,
    CadastrosHomeRoutingModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatListModule
  ]
})
export class CadastrosHomeModule { }
