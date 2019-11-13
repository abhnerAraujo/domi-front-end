import { AtendimentosHomeComponent } from './componentes/atendimentos-home/atendimentos-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const rotas: Routes = [
  {
    path: '',
    component: AtendimentosHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})

export class AtendimentosHomeRoutingModule { }
