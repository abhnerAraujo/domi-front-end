import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const rotas: Routes = [
  {
    path: '',
    loadChildren: () => import('./componentes/atendimentos-home/atendimentos-home.module').then(m => m.AtendimentosHomeModule)
  },
  {
    path: 'agenda',
    loadChildren: () => import('./componentes/atendimentos-agenda/atendimentos-agenda.module').then(m => m.AtendimentosAgendaModule)
  },
  {
    path: 'novo',
    loadChildren: () => import('./componentes/atendimento-novo/atendimento-novo.module').then(m => m.AtendimentoNovoModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})

export class AtendimentosRoutingModule { }
