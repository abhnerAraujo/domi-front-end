export interface ListarEspacosResponse {
  sucesso: boolean;
  mensagem: string;
  dados: Espaco[];
}

export interface Espaco {
  id: string;
  dados: EspacoDados;
}

export interface EspacoDados {
  updated_at: string;
  descricao: string;
  deleted_at: string;
  padrao: boolean;
  created_at: string;
}
