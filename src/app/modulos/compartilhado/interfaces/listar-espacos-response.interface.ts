export interface ListarEspacosResponse {
  sucesso: boolean;
  mensagem: string;
  dados: Espaco[];
}

export interface Espaco {
  espaco_id: number;
  espaco_profissional_id: number;
  descricao: string;
  padrao: boolean;
  arquivado: boolean;
}
