import { SessaoResumoComponent } from './sessao-resumo/sessao-resumo.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const rotas: Routes = [
  {
    path: '',
    component: SessaoResumoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})

export class SessaoResumoRoutingModule { }
