import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CriarAtendimentoRequest, CriarAtendimentoResponse, ListarAtendimentosResponse, ListarAtendimentoConfiguracoesResponse
} from '../../interfaces';

@Injectable()
export class AtendimentosService {

  constructor(private http: HttpClient) { }

  criar(dados: CriarAtendimentoRequest) {
    return this.http
      .post<CriarAtendimentoResponse>('atendimentos', dados);
  }

  listar() {
    return this.http
      .get<ListarAtendimentosResponse>('atendimentos');
  }

  configuracoes(atendimentId: number) {
    return this.http
      .get<ListarAtendimentoConfiguracoesResponse>(`atendimentos/${atendimentId}/configuracoes`);
  }

  valorPadrao(atendimentoid: number, valor: string) {
    return this.http
      .put<any>(`atendimentos/${atendimentoid}/configuracoes/valor`, { valor_padrao: valor });
  }


}
