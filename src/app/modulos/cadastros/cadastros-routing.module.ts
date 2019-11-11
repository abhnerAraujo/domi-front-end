import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const rotas: Routes = [
  {
    path: '',
    loadChildren: () => import('./componentes/cadastros-home/cadastros-home.module').then(m => m.CadastrosHomeModule)
  },
  {
    path: 'pacientes',
    loadChildren: () => import('./componentes/paciente/paciente.module').then(m => m.PacienteModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})

export class CadastrosRoutingModule { }
