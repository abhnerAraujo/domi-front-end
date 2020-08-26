export interface ResumoPagamentoSessao {
  sessao_id: number;
  valor_total_sessao: string;
  valor_pago: string;
  falta_receber: string;
}

export interface ResumoPagamentosResponse {
  sucesso: boolean;
  mensagem: string;
  dados: ResumoPagamentoSessao[];
}
