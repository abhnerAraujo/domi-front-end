import { PacientesListaComponent } from './componentes/paciente/pacientes-lista/pacientes-lista.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const rotas: Routes = [
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
