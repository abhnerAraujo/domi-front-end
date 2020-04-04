import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CriarAtendimentoRequest, CriarAtendimentoResponse, ListarAtendimentosResponse, ListarAtendimentoConfiguracoesResponse,
  ConfiguracaoAtendimento, Atendimento, DetalharAtendimentoRequest, EditarAtendimentoResponse
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

  detalhar(atendimentoId: number) {
    return this.http
      .get<DetalharAtendimentoRequest>(`atendimentos/${atendimentoId}`);
  }

  editar(atendimentoId: number, dados: Atendimento) {
    return this.http
      .put<EditarAtendimentoResponse>(`atendimentos/${atendimentoId}`, dados);
  }

  configuracoes(atendimentId: number) {
    return this.http
      .get<ListarAtendimentoConfiguracoesResponse>(`atendimentos/${atendimentId}/configuracoes`);
  }

  valorPadrao(atendimentoid: number, valor: string) {
    return this.http
      .put<any>(`atendimentos/${atendimentoid}/configuracoes/valor`, { valor_padrao: valor });
  }

  editarConfiguracao(atendimentoId: number, dados: ConfiguracaoAtendimento) {
    return this.http
      .put<any>(`atendimentos/${atendimentoId}/configuracoes/${dados.atendimento_configuracao_id}`, dados);
  }

  criarConfiguracao(atendimentoId: number, dados: ConfiguracaoAtendimento) {
    return this.http
      .post<any>(`atendimentos/${atendimentoId}/configuracoes`, dados);
  }

  excluirConfiguracao(atendimentoId: number, atendimentoConfiguracaoId: number) {
    return this.http
      .delete<any>(`atendimentos/${atendimentoId}/configuracoes/${atendimentoConfiguracaoId}`);
  }

}
