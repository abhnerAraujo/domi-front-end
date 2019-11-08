import { AcessarComponent } from './componentes/acessar/acessar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const rotas: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AcessarComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})

export class AcessoRoutingModule { }
