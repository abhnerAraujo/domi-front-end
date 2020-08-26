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
  },
  {
    path: ':id_atendimento',
    children: [
      {
        path: '',
        loadChildren: () => import('./componentes/atendimento-resumo/atendimento-resumo.module').then(m => m.AtendimentoResumoModule)
      },
      {
        path: 'sessoes',
        loadChildren: () => import('../../modulos/sessao/sessao.module').then(m => m.SessaoModule)
      },
      {
        path: 'configuracoes',
        loadChildren: () => import('./componentes/atendimento-configuracao/atendimento-configuracao.module')
          .then(m => m.AtendimentoConfiguracaoModule)
      },
      {
        path: 'anamnese',
        loadChildren: () => import('../anamnese/anamnese.module').then(m => m.AnamneseModule)
      },
      {
        path: 'avaliacao',
        loadChildren: () => import('../avaliacao/avaliacao.module').then(m => m.AvaliacaoModule)
      },
      {
        path: 'planejamentos',
        loadChildren: () => import('../planejamentos/planejamentos.module').then(m => m.PlanejamentosModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})

export class AtendimentosRoutingModule { }
