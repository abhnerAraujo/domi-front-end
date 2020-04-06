import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanejamentoListaComponent } from './componentes/planejamento-lista/planejamento-lista.component';

const rotas: Routes = [
  {
    path: '',
    component: PlanejamentoListaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})

export class PlanejamentosRoutingModule { }
