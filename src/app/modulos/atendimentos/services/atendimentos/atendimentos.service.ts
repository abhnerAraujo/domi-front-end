import { CriarAtendimentoRequest, CriarAtendimentoResponse } from './../../interfaces/criar-atendimento.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AtendimentosService {

  constructor(private http: HttpClient) { }

  criar(dados: CriarAtendimentoRequest) {
    return this.http
      .post<CriarAtendimentoResponse>('atendimentos', dados);
  }


}
