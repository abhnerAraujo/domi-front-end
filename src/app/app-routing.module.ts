import { AcessoGuard } from './guards/acesso/acesso.guard';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  ContainerPrincipalWrapperComponent
} from './modulos/compartilhado/componentes/container-principal-wrapper/container-principal-wrapper.component';

const routes: Routes = [
  {
    path: 'acessar',
    loadChildren: () => import('./modulos/acesso/acesso.module').then(m => m.AcessoModule)
  },
  {
    path: '',
    component: ContainerPrincipalWrapperComponent,
    canActivate: [AcessoGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./modulos/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'cadastros',
        loadChildren: () => import('./modulos/cadastros/cadastros-routing.module').then(m => m.CadastrosRoutingModule)
      },
      {
        path: 'atendimentos',
        loadChildren: () => import('./modulos/atendimentos/atendimentos.module').then(m => m.AtendimentosModule)
      },
      {
        path: 'sessoes',
        loadChildren: () => import('./modulos/sessao/sessao.module').then(m => m.SessaoModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
