import { EspacosListaComponent } from './componentes/espacos-lista/espacos-lista.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const rotas: Routes = [
  {
    path: '',
    component: EspacosListaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})

export class EspacosRoutingModule { }
