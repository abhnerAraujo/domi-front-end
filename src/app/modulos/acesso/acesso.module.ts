import { FlexLayoutModule } from '@angular/flex-layout';
import { AcessoRoutingModule } from './acesso-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcessarComponent } from './componentes/acessar/acessar.component';
import { MatButtonModule, MatFormFieldModule, MatCardModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AcessarComponent],
  imports: [
    CommonModule,
    AcessoRoutingModule,
    MatButtonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class AcessoModule { }
