export interface ListarEspacosResponse {
  sucesso: boolean;
  mensagem: string;
  dados: Espaco[];
}

export interface Espaco {
  espaco_id: number;
  descricao: string;
  padrao: boolean;
}
