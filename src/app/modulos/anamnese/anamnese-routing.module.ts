import { AnamneseDetalheComponent } from './componentes/anamnese-detalhe/anamnese-detalhe.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const rotas: Routes = [
  {
    path: '',
    children: [
      {
        path: 'nova',
        component: AnamneseDetalheComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})

export class AnamneseRoutingModule { }
