import { AuthService } from './../modulos/compartilhado/services/auth/auth.service';
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
    private progressBar: ProgressBarService,
    private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.progressBar.show();
    const rotaSemAuth = ROUTES_NO_AUTH.find(rota => `${this.baseUrl}/${request.url}`.indexOf(`${this.baseUrl}/${rota}`) >= 0);
    if (!rotaSemAuth) {
      const dadosUsuario: DadosUsuario = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ITENS.dados_usuario));

      this.authService.updateToken();

      const headers = new HttpHeaders()
        .set('Token', localStorage.getItem(LOCAL_STORAGE_ITENS.token))
        .set('Contexto', localStorage.getItem(LOCAL_STORAGE_ITENS.contexto) || '')
        .set('Profissional',
          dadosUsuario && dadosUsuario.perfis && dadosUsuario.perfis.length ? `${dadosUsuario.perfis[0].profissional_id}` : '');
      const apiReq = request.clone({ url: `${this.baseUrl}/${request.url}`, headers });
      return next.handle(apiReq);
    } else {
      const apiReq = request.clone({ url: `${this.baseUrl}/${request.url}` });
      return next.handle(apiReq);
    }
  }
}
