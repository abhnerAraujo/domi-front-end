import { ROUTES_NO_AUTH } from './../constantes/config';
import { Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    @Inject('BASE_API_URL') private baseUrl: string) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (ROUTES_NO_AUTH.indexOf(request.url) === -1) {
      const headers = new HttpHeaders()
        .set('token', localStorage.getItem('x-access-token'))
        .set('contexto', localStorage.getItem('x-context') || '');
      const apiReq = request.clone({ url: `${this.baseUrl}/${request.url}`, headers });
      return next.handle(apiReq);
    } else {
      const apiReq = request.clone({ url: `${this.baseUrl}/${request.url}` });
      return next.handle(apiReq);
    }
  }
}
