export interface Pagamento {
  sessao_pagamento_id: number;
  sessao: number;
  valor_pago: number;
  tipo_pagamento: number;
  tipo_pagamento_descricao: string;
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
