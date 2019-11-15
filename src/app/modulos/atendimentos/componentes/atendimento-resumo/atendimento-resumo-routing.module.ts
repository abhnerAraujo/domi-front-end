import { AtendimentoResumoComponent } from './componentes/atendimento-resumo/atendimento-resumo.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const rotas: Routes = [
  {
    path: '',
    component: AtendimentoResumoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})

export class AtendimentoResumoRoutingModule { }
