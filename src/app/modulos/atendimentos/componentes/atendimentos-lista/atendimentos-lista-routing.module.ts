import { AtendimentosListaComponent } from './componentes/atendimentos-lista/atendimentos-lista.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const rotas: Routes = [
  {
    path: '',
    component: AtendimentosListaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})

export class AtendimentosListaRoutingModule { }
