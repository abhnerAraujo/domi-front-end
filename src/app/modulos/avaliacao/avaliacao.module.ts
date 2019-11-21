import { QuestaoItemModule } from '../../modulos/compartilhado/componentes/questao-item/questao-item.module';
import { AvaliacaoRoutingModule } from './avaliacao-routing.module';
import { AvaliacaoDetalheComponent } from './componentes/avaliacao-detalhe/avaliacao-detalhe.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatCardModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AvaliacaoDetalheComponent],
  imports: [
    CommonModule,
    AvaliacaoRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    QuestaoItemModule
  ]
})
export class AvaliacaoModule { }
