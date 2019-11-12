import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { CompartilhadoModule } from './modulos/compartilhado/compartilhado.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { GestureConfig } from '@angular/material';

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
  providers: [{ provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
