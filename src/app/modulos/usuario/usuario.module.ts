import { MatCardModule } from '@angular/material';
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
    MatCardModule
  ]
})
export class UsuarioModule { }
