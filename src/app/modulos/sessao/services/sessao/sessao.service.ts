import { ResumoPagamentosResponse } from './../../interfaces/resumo-pagamentos-response.interface';
import { HttpClient } from '@angular/common/http';
import { MomentService } from './../../../compartilhado/services/moment/moment.service';
import { ListarSessoesResponse } from './../../interfaces/sessao-lista-response.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessaoService {

  constructor(private http: HttpClient) { }

  sessoes(atendimentoId: number) {
    return this.http
      .get<ListarSessoesResponse>(`atendimentos/${atendimentoId}/sessoes`);
  }

  sessao(atendimentoId: number, sessaoId: number) {
    return this.http
      .get<ListarSessoesResponse>(`atendimentos/${atendimentoId}/sessoes/${sessaoId}`);
  }

  resumoPagamentos(atendimentoId: number) {
    return this.http
      .get<ResumoPagamentosResponse>(`atendimentos/${atendimentoId}/sessoes/resumo_pagamentos`);
  }

  salvar(atendimentoId: number, dados: any) {
    return this.http
      .post<any>(`atendimentos/${atendimentoId}/sessoes`, dados);
  }
}
