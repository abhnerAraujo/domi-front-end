import { PipesModule } from './../../pipes/pipes.module';
import { MomentService } from './../compartilhado/services/moment/moment.service';
import { PlanejamentosService } from './services/planejamentos/planejamentos.service';
import { MatIconModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDividerModule, MatSnackBarModule, MatProgressSpinnerModule, MatExpansionModule, MatChipsModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PlanejamentosRoutingModule } from './plajenamentos-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanejamentoListaComponent } from './componentes/planejamento-lista/planejamento-lista.component';
import { PlanejamentoItemComponent } from './componentes/planejamento-item/planejamento-item.component';

@NgModule({
  declarations: [PlanejamentoListaComponent, PlanejamentoItemComponent],
  imports: [
    CommonModule,
    PlanejamentosRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    PipesModule,
    MatExpansionModule,
    MatChipsModule
  ],
  providers: [
    PlanejamentosService,
    MomentService
  ]
})
export class PlanejamentosModule { }
