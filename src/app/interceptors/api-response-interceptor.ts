import { Injectable } from '@angular/core';
import {
  ProgressBarService
} from './../modulos/compartilhado/componentes/container-principal-wrapper/services/progress-bar/progress-bar.service';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ApiResponseInterceptor implements HttpInterceptor {
  constructor(private progressBar: ProgressBarService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req)
      .pipe(
        tap(
          evt => {
            if (evt instanceof HttpResponse) {
              setTimeout(() => {
                this.progressBar.hide();
              }, 2000);
            }
          },
          err => {
            setTimeout(() => {
              this.progressBar.hide();
            }, 2000);
          }
        )
      );
  }
}
