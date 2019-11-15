import { AtendimentoConfiguracaoComponent } from './componentes/atendimento-configuracao/atendimento-configuracao.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const rotas: Routes = [
  {
    path: '',
    component: AtendimentoConfiguracaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})

export class AtendimentoConfiguracaoRoutingModule { }
