import { AtendimentosAgendaComponent } from './componentes/atendimentos-agenda/atendimentos-agenda.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const rotas: Routes = [
  {
    path: '',
    component: AtendimentosAgendaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})

export class AtendimentosAgendaRoutingModule { }
