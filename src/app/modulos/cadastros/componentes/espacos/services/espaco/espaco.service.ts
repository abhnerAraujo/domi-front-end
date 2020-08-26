import { Espaco } from './../../../../../acesso/interfaces/dados-usuario-response.interface';
import { ListarEspacosResponse } from '../../../../../compartilhado/interfaces/listar-espacos-response.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EspacoService {

  constructor(private http: HttpClient) { }

  listar(): Observable<ListarEspacosResponse> {
    return this.http
      .get<ListarEspacosResponse>('/usuarios/espacos');
  }

  editarEspaco(request: Espaco) {
    return this.http
      .put<any>('/usuarios/espacos', request);
  }

  desabilitar(request: Espaco) {
    return this.http
      .put<any>(`/usuarios/espacos/${request.espaco_profissional_id}/desabilitar`, request);
  }

  habilitar(request: Espaco) {
    return this.http
      .put<any>(`/usuarios/espacos/${request.espaco_profissional_id}/habilitar`, request);
  }

  excluir(request: Espaco) {
    return this.http
      .delete<any>(`/usuarios/espacos/${request.espaco_profissional_id}`);
  }
}
