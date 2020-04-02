export interface TipoPagamento {
  tipo_pagamento_id: number;
  descricao: string;
}

export interface TiposPagamentoResponse {
  sucesso: boolean;
  mensagem: string;
  dados: TipoPagamento[];
}
