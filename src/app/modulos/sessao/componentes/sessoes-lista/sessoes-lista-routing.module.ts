import { SessoesListaComponent } from './sessoes-lista/sessoes-lista.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const rotas: Routes = [
  {
    path: '',
    component: SessoesListaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})

export class SessoesListaRoutingModule { }
