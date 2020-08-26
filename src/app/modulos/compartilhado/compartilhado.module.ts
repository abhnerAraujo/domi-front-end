import { UsuarioService } from './../acesso/services/usuario/usuario.service';
import { MomentService } from 'src/app/modulos/compartilhado/services/moment/moment.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerPrincipalWrapperComponent } from './componentes/container-principal-wrapper/container-principal-wrapper.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToolbarComponent } from './componentes/container-principal-wrapper/componentes/toolbar/toolbar.component';
import {
  MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, MatMenuModule, MatDividerModule, MatProgressBarModule,
  MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSnackBarModule
} from '@angular/material';
import {
  NavegacaoMenuComponent
} from './componentes/container-principal-wrapper/componentes/navegacao-menu/navegacao-menu.component';
import { LoaderComponent } from './componentes/container-principal-wrapper/componentes/loader/loader.component';
import { PerfilUsuarioComponent } from './componentes/container-principal-wrapper/componentes/perfil-usuario/perfil-usuario.component';

@NgModule({
  declarations: [ContainerPrincipalWrapperComponent, ToolbarComponent, NavegacaoMenuComponent, LoaderComponent, PerfilUsuarioComponent],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatDividerModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSnackBarModule
  ],
  exports: [
    ContainerPrincipalWrapperComponent
  ],
  providers: [MomentService, UsuarioService]
})
export class CompartilhadoModule { }
