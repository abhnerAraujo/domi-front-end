import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const rotas: Routes = [
  {
    path: '',
    loadChildren: () => import('./componentes/sessoes-lista/sessoes-lista.module').then(m => m.SessoesListaModule)
  },
  {
    path: 'nova',
    loadChildren: () => import('./componentes/sessao/sessao.module').then(m => m.SessaoModule)
  },
  {
    path: ':id',
    loadChildren: () => import('./componentes/sessao-resumo/sessao-resumo.module').then(m => m.SessaoResumoModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})

export class SessaoRoutingModule { }
