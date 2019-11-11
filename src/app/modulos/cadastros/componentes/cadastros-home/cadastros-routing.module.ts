import { CadastrosHomeComponent } from './componentes/cadastros-home/cadastros-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const rotas: Routes = [
  {
    path: '',
    component: CadastrosHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})

export class CadastrosHomeRoutingModule { }
