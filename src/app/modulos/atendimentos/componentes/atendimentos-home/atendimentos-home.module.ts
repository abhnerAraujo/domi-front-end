import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatButtonModule, MatListModule, MatCardModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtendimentosHomeComponent } from './componentes/atendimentos-home/atendimentos-home.component';
import { AtendimentosHomeRoutingModule } from './atendimentos-home-routing.module';
import { AtendimentosListaComponent } from './componentes/atendimentos-home/componentes/atendimentos-lista/atendimentos-lista.component';


@NgModule({
  declarations: [AtendimentosHomeComponent, AtendimentosListaComponent],
  imports: [
    CommonModule,
    AtendimentosHomeRoutingModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatListModule,
    MatCardModule
  ]
})
export class AtendimentosHomeModule { }
