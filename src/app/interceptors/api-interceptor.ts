import { DadosUsuario } from './../modulos/acesso/interfaces/dados-usuario-response.interface';
import {
  ProgressBarService
} from './../modulos/compartilhado/componentes/container-principal-wrapper/services/progress-bar/progress-bar.service';
import { ROUTES_NO_AUTH, LOCAL_STORAGE_ITENS } from './../constantes/config';
import { Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    private progressBar: ProgressBarService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.progressBar.show();
    if (ROUTES_NO_AUTH.indexOf(request.url) === -1) {
      const dadosUsuario: DadosUsuario = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ITENS.dados_usuario));

      const headers = new HttpHeaders()
        .set('Usuario-Id', localStorage.getItem('x-access-token'))
        .set('Contexto', localStorage.getItem('x-context') || '')
        .set('Profissional', `${dadosUsuario.perfis[0].profissional_id}`);
      const apiReq = request.clone({ url: `${this.baseUrl}/${request.url}`, headers });
      return next.handle(apiReq);
    } else {
      const apiReq = request.clone({ url: `${this.baseUrl}/${request.url}` });
      return next.handle(apiReq);
    }
  }
}
