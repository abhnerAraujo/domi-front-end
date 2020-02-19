import { UsuarioService } from './../acesso/services/usuario/usuario.service';
import { MomentService } from './../compartilhado/services/moment/moment.service';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule, MatSelectModule, MatButtonModule, MatIconModule, MatFormFieldModule,
  MatInputModule, MatStepperModule, MatDatepickerModule, MatSnackBarModule, MatProgressSpinnerModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastrarPerfilComponent } from './componentes/cadastrar-perfil/cadastrar-perfil.component';

@NgModule({
  declarations: [CadastrarPerfilComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    FlexLayoutModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  providers: [MomentService, UsuarioService]
})
export class UsuarioModule { }
