import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagamentosListarResponse, SalvarPagamentoRequest } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PagamentosService {

  constructor(private http: HttpClient) { }

  pagamentos(atendimentoId: number, sessaoId: number) {
    return this.http
      .get<PagamentosListarResponse>(`atendimentos/${atendimentoId}/sessoes/${sessaoId}/pagamentos`);
  }

  salvar(atendimentoId: number, sessaoId: number, dados: SalvarPagamentoRequest) {
    return this.http
      .post<any>(`atendimentos/${atendimentoId}/sessoes/${sessaoId}/pagamentos`, dados);
  }
}
