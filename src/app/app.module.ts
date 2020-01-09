import { ProgressBarService } from './modulos/compartilhado/componentes/container-principal-wrapper/services/progress-bar/progress-bar.service';
import { ApiInterceptor } from './interceptors/api-interceptor';
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
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CompartilhadoModule,
    NgxMaterialTimepickerModule.setLocale('pt-BR'),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule
  ],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: 'BASE_API_URL', useValue: environment.domi_api },
    ProgressBarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
