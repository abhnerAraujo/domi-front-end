import { AcessoService } from './services/acesso/acesso.service';
import { UsuarioService } from './services/usuario/usuario.service';
import { MomentService } from './../compartilhado/services/moment/moment.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AcessoRoutingModule } from './acesso-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcessarComponent } from './componentes/acessar/acessar.component';
import {
  MatButtonModule, MatFormFieldModule, MatCardModule, MatInputModule, MatSnackBarModule, MatDatepickerModule, MatSelectModule,
  MatDividerModule, MatSidenavModule, MatProgressSpinnerModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { CriarUsuarioComponent } from './componentes/criar-usuario/criar-usuario.component';

@NgModule({
  declarations: [AcessarComponent, CriarUsuarioComponent],
  imports: [
    CommonModule,
    AcessoRoutingModule,
    MatButtonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatSelectModule,
    MatDividerModule,
    MatSidenavModule,
    MatProgressSpinnerModule
  ],
  providers: [MomentService, UsuarioService, AcessoService]
})
export class AcessoModule { }
