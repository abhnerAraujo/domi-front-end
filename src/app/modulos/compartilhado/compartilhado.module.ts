import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerPrincipalWrapperComponent } from './componentes/container-principal-wrapper/container-principal-wrapper.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToolbarComponent } from './componentes/container-principal-wrapper/componentes/toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material';

@NgModule({
  declarations: [ContainerPrincipalWrapperComponent, ToolbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatToolbarModule
  ],
  exports: [
    ContainerPrincipalWrapperComponent
  ]
})
export class CompartilhadoModule { }
