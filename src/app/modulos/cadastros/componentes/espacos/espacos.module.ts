import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspacosListaComponent } from './componentes/espacos-lista/espacos-lista.component';
import { DialogoCadastroEspacoComponent } from './componentes/dialogo-cadastro-espaco/dialogo-cadastro-espaco.component';
import { EspacoRoutingModule } from './espaco-routing.module';

@NgModule({
  declarations: [EspacosListaComponent, DialogoCadastroEspacoComponent],
  imports: [
    CommonModule,
    EspacoRoutingModule
  ]
})
export class EspacosModule { }
