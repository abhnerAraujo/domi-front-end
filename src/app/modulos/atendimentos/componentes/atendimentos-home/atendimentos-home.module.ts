import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtendimentosHomeComponent } from './componentes/atendimentos-home/atendimentos-home.component';
import { AtendimentosHomeRoutingModule } from './atendimentos-home-routing.module';


@NgModule({
  declarations: [AtendimentosHomeComponent],
  imports: [
    CommonModule,
    AtendimentosHomeRoutingModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule
  ]
})
export class AtendimentosHomeModule { }
