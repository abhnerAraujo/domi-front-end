import { AtendimentosService } from './../atendimentos/services/atendimentos/atendimentos.service';
import { QuestaoItemModule } from '../../modulos/compartilhado/componentes/questao-item/questao-item.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatCardModule, MatSnackBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AnamneseRoutingModule } from './anamnese-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnamneseDetalheComponent } from './componentes/anamnese-detalhe/anamnese-detalhe.component';

@NgModule({
  declarations: [AnamneseDetalheComponent],
  imports: [
    CommonModule,
    AnamneseRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    QuestaoItemModule,
    MatSnackBarModule
  ],
  exports: [
    AnamneseDetalheComponent
  ],
  providers: [AtendimentosService]
})
export class AnamneseModule { }
