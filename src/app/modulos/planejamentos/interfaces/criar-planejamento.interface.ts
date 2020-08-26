export interface CriarPlanejamentoRequest {
  planejamento_texto: string;
  objetivos?: CriarObjetivoRequest[];
}

export interface CriarObjetivoRequest {
  planejamento_objetivo_id: number;
  conteudo: string;
  excluido?: boolean;
  atividades?: CriarAtividadeRequest[];
}

export interface CriarAtividadeRequest {
  objetivo_atividade_id: number;
  conteudo: string;
  excluido?: boolean;
}

export interface CriarPlanejamentoResponse {
  mensagem: string;
  sucesso: boolean;
  dados: CriarPlanejamentoDados;
}

export interface CriarPlanejamentoDados {
  planejamento_id: number;
}
