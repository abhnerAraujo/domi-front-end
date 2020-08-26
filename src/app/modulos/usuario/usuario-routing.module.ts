import { CadastrarPerfilComponent } from './componentes/cadastrar-perfil/cadastrar-perfil.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const rotas: Routes = [
  {
    path: 'criar-perfil',
    component: CadastrarPerfilComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})

export class UsuarioRoutingModule { }
