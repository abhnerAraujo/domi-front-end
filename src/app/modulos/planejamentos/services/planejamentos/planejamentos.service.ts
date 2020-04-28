import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CriarPlanejamentoRequest, CriarPlanejamentoResponse, ExcluirPlanejamentoResponse, EditarPlanejamentoRequest,
  EditarPlanejamentoResponse, ListarPlanejamentoResponse, ListarAtividadesResponse
} from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PlanejamentosService {

  constructor(private http: HttpClient) { }

  criar(atendimentoId: number, dados: CriarPlanejamentoRequest) {
    return this.http
      .post<CriarPlanejamentoResponse>(`atendimentos/${atendimentoId}/planejamentos`, dados);
  }

  editar(atendimentoId: number, planejamentoId: number, dados: CriarPlanejamentoRequest) {
    return this.http
      .put<EditarPlanejamentoResponse>(`atendimentos/${atendimentoId}/planejamentos/${planejamentoId}`, dados);
  }

  listar(atendimentoId: number, filtros: any) {
    return this.http
      .get<ListarPlanejamentoResponse>(`atendimentos/${atendimentoId}/planejamentos`, { params: filtros });
  }

  excluir(atendimentoId: number, planejamentoId: number) {
    return this.http
      .delete<ExcluirPlanejamentoResponse>(`atendimentos/${atendimentoId}/planejamentos/${planejamentoId}`);
  }

  listaraAtividades(atendimentoId: number, planejamentoId: number, objetivoId: number) {
    return this.http
      .get<ListarAtividadesResponse>(`atendimentos/${atendimentoId}/planejamentos/${planejamentoId}/objetivos/${objetivoId}/atividades`);

  }
}
