import {
  ResumoPagamentosResponse, SalvarSessaoRequest, ListarSessoesResponse, SalvarSessaoResponse, Sessao, IniciarSessaoResponse
} from './../../interfaces';
import { HttpClient } from '@angular/common/http';
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

  salvar(atendimentoId: number, dados: SalvarSessaoRequest) {
    return this.http
      .post<SalvarSessaoResponse>(`atendimentos/${atendimentoId}/sessoes`, dados);
  }

  editar(atendimentoId: number, sessaoId: number, dados: Sessao) {
    return this.http
      .put<any>(`atendimentos/${atendimentoId}/sessoes/${sessaoId}`, dados);
  }

  iniciar(atendimentoId: number, sessaoId: number) {
    return this.http
      .put<IniciarSessaoResponse>(`atendimentos/${atendimentoId}/sessoes/${sessaoId}/iniciar`, {});
  }

  finalizar(atendimentoId: number, sessaoId: number) {
    return this.http
      .put<IniciarSessaoResponse>(`atendimentos/${atendimentoId}/sessoes/${sessaoId}/finalizar`, {});
  }

  pausar(atendimentoId: number, sessaoId: number, tempoCorrido: number) {
    return this.http
      .put<IniciarSessaoResponse>(`atendimentos/${atendimentoId}/sessoes/${sessaoId}/pausar`, { tempo_corrido: tempoCorrido });
  }
}
