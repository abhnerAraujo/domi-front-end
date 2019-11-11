import { PacienteCadastroComponent } from './paciente-cadastro/paciente-cadastro.component';
import { PacientesListaComponent } from './pacientes-lista/pacientes-lista.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const rotas: Routes = [
  {
    path: '',
    component: PacientesListaComponent
  },
  {
    path: 'novo',
    component: PacienteCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})

export class PacienteRoutingModule { }
