import { MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatCardModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AnamneseRoutingModule } from './anamnese-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnamneseDetalheComponent } from './componentes/anamnese-detalhe/anamnese-detalhe.component';
import { AnamneseItemComponent } from './componentes/anamnese-detalhe/componentes/anamnese-item/anamnese-item.component';

@NgModule({
  declarations: [AnamneseDetalheComponent, AnamneseItemComponent],
  imports: [
    CommonModule,
    AnamneseRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ],
  exports: [
    AnamneseDetalheComponent
  ]
})
export class AnamneseModule { }
