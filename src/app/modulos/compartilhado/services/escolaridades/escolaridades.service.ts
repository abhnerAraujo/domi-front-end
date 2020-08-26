import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListarEscolaridadeRequest } from '../../interfaces/escolaridade';

@Injectable({
  providedIn: 'root'
})
export class EscolaridadesService {

  constructor(private http: HttpClient) { }

  listar() {
    return this.http
      .get<ListarEscolaridadeRequest>('escolaridades');
  }
}
