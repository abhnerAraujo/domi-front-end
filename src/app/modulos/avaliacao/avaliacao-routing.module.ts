import { AvaliacaoDetalheComponent } from './componentes/avaliacao-detalhe/avaliacao-detalhe.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const rotas: Routes = [
  {
    path: '',
    children: [
      {
        path: 'nova',
        component: AvaliacaoDetalheComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})

export class AvaliacaoRoutingModule { }
