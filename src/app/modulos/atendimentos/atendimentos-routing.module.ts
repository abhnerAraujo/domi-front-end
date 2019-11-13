import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const rotas: Routes = [
  {
    path: '',
    loadChildren: () => import('./componentes/atendimentos-home/atendimentos-home.module').then(m => m.AtendimentosHomeModule)
  },
  {
    path: 'agenda',
    loadChildren: () => import('./componentes/atendimentos-lista/atendimentos-lista.module').then(m => m.AtendimentosListaModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})

export class AtendimentosRoutingModule { }
