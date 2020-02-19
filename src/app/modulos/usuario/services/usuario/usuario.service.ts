import { DadosUsuarioResponse } from './../../interfaces/dados-usuario-response.interface';
import { SalvarProfissionalResponse } from './../../interfaces/salvar-profissional-response.interface';
import { SalvarProfissionalRequest } from './../../interfaces/salvar-profissional-request.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  criarPerfil(dados: SalvarProfissionalRequest): Observable<SalvarProfissionalResponse> {
    return this.http
      .post<SalvarProfissionalResponse>('profissionais', dados);
  }

  dadosUsuario(id: number): Observable<DadosUsuarioResponse> {
    return this.http
      .get<DadosUsuarioResponse>(`usuarios/${id}`);
  }

}
