import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerPrincipalWrapperComponent } from './componentes/container-principal-wrapper/container-principal-wrapper.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToolbarComponent } from './componentes/container-principal-wrapper/componentes/toolbar/toolbar.component';
import { MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule } from '@angular/material';
import {
  NavegacaoMenuComponent
} from './componentes/container-principal-wrapper/componentes/navegacao-menu/navegacao-menu.component';

@NgModule({
  declarations: [ContainerPrincipalWrapperComponent, ToolbarComponent, NavegacaoMenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule
  ],
  exports: [
    ContainerPrincipalWrapperComponent
  ]
})
export class CompartilhadoModule { }