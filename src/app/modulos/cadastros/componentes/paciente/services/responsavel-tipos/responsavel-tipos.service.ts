import { ListarResponsavelTiposResponse } from './../../interfaces/listar-responsavel-tipos-response.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ResponsavelTiposService {

  constructor(private http: HttpClient) { }

  listar() {
    return this.http
      .get<ListarResponsavelTiposResponse>('responsavel-tipos');
  }
}
