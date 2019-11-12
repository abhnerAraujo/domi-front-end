import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { CompartilhadoModule } from './modulos/compartilhado/compartilhado.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CompartilhadoModule,
    NgxMaterialTimepickerModule.setLocale('pt-BR')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
