import { DATE_FORMATS } from './constantes/date-formats';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { CompartilhadoModule } from './modulos/compartilhado/compartilhado.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { GestureConfig, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

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
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
