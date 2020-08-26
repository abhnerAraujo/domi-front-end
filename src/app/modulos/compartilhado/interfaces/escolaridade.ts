export interface Escolaridade {
  escolaridade_id: number;
  descricao: string;
}

export interface ListarEscolaridadeRequest {
  dados: Escolaridade[];
  sucesso: boolean;
  mensagem: string;
}
