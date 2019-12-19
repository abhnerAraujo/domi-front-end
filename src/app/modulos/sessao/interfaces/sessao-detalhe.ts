export interface SessaoDetalhe {
  sessao_id: number;
  sessao_data: string;
  sessao_hora_inicio: string;
  sessao_hora_fim: string;
  sessao_valor: number;
  sessao_pago: boolean;
  sessao_quantidade: number;
  sessao_duracao: number;
  sessao_valor_pago: number;
  sessao_responsavel: SessaoResponsavel;
  planejamento_id: number;
  evolucao_id: number;
}

export interface SessaoResponsavel {
  sessao_responsavel_id: number;
  sessao_responsavel_nome: string;
  sessao_responsavel_email: string;
  sessao_responsavel_telefone: string;
}
