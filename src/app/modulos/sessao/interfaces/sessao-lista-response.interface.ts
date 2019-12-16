export interface Sessao {
  sessao_id: number;
  valor_pago: number;
  sessao_data: string;
  sessao_valor: number;
  evolucao?: Evolucao;
}

export interface Evolucao {
  evolucao_id: number;
  sessao_id: number;
  evolucao_descricao: string;
  indicador: number;
}
