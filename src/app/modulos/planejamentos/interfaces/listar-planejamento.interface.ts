export interface Planejamento {
  planejamento_texto: string;
  planejamento_id: number;
  created_at: string;
  materiais?: string;
  objetivos?: Objetivo[];
  excluido?: boolean;
}

export interface Objetivo {
  planejamento_objetivo_id: number;
  conteudo: string;
  atividades?: Atividade[];
  excluido?: boolean;
}

export interface Atividade {
  objetivo_atividade_id: number;
  conteudo: string;
  excluido?: boolean;
}

export interface ListarAtividadesResponse {
  dados: Atividade[];
  mensagem: string;
  sucesso: boolean;
}

export interface ListarPlanejamentoResponse {
  mensagem: string;
  sucesso: boolean;
  dados: Planejamento[];
}
