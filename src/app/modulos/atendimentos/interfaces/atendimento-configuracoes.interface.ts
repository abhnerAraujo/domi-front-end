export interface ConfiguracaoAtendimento {
  atendimento_configuracao_id: number;
  atendimento: number;
  dia_semana: number;
  hora_inicio: string;
  quantidade: number;
  valor_sessao?: number;
  duracao: number;
  sessoes?: any[];
}

export interface DuracaoSessao {
  hora_inicio: string;
  hora_fim: string;
}

export interface ListarAtendimentoConfiguracoes {
  dias: ConfiguracaoAtendimento[];
  valor_padrao: number;
}

export interface ListarAtendimentoConfiguracoesResponse {
  sucesso: boolean;
  mensagem: string;
  dados: ListarAtendimentoConfiguracoes;
}
