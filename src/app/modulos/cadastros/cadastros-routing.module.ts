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
  },
  {
    path: 'espacos',
    loadChildren: () => import('./componentes/espacos/espacos.module').then(m => m.EspacosModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})

export class CadastrosRoutingModule { }
