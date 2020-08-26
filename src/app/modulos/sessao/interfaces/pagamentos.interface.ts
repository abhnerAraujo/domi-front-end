export interface Pagamento {
  sessao_pagamento_id: number;
  sessao: number;
  valor_pago: number;
  tipo_pagamento: number;
  tipo_pagamento_descricao: string;
  data_pagamento: string;
  pagamento_cartao_id?: number;
  quantidade_parcelas?: number;
  numero_comprovante?: string;
  numero_cartao?: string;
  excluido?: boolean;
}

export interface PagamentosListarResponse {
  sucesso: boolean;
  mensagem: string;
  dados: Pagamento[];
}

export interface SalvarPagamentoRequest {
  valor_pago: number;
  tipo_pagamento: number;
}
