import { Agendamento, CriarAgendamentoRespone, ListarAgendamentosResponse } from './../../interfaces/agendamento.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AgendamentosService {

  constructor(private http: HttpClient) { }

  criar(dados: Agendamento) {
    return this.http
      .post<CriarAgendamentoRespone>('agendamentos', dados);
  }

  editar(agendamentoId: number, dados: Agendamento) {
    return this.http
      .put<any>(`agendamentos/${agendamentoId}`, dados);
  }

  listar(consulta?: any) {
    return this.http
      .get<ListarAgendamentosResponse>('agendamentos', { params: consulta ? consulta : null });
  }

  excluir(agendamentoId: number) {
    return this.http
      .delete<any>(`agendamentos/${agendamentoId}`);
  }

}
