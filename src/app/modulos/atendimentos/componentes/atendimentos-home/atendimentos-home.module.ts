import { PipesModule } from './../../../../pipes/pipes.module';
import { AtendimentosService } from './../../services/atendimentos/atendimentos.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatIconModule, MatButtonModule, MatListModule, MatCardModule, MatSnackBarModule
} from '@angular/material';
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
    MatCardModule,
    MatSnackBarModule,
    PipesModule
  ],
  providers: [
    AtendimentosService
  ]
})
export class AtendimentosHomeModule { }
