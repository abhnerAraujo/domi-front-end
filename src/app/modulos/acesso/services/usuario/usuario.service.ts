import { CriarUsuarioResponse } from './../../interfaces/criar-usuario-response.interface';
import { Observable } from 'rxjs';
import { CriarUsuarioRequest } from './../../interfaces/criar-usuario-request.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  login(dados: CriarUsuarioRequest): Observable<CriarUsuarioResponse> {
    return this.http
      .post<CriarUsuarioResponse>('usuarios', dados);
  }
}
