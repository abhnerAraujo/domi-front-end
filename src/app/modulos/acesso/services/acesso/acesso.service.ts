import { Observable } from 'rxjs';
import { LoginResponse } from './../../interfaces/login-response.interface';
import { LoginRequest } from './../../interfaces/login-request.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AcessoService {

  constructor(private http: HttpClient) { }

  login(dados: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>('acesso', dados);
  }

  authFirebase(token: string): Observable<any> {
    return this.http
      .post<any>('acesso/auth', null, { headers: { token } });
  }
}
