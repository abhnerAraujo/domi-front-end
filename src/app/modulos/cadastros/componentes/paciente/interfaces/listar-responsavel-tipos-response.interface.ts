export interface ListarResponsavelTiposResponse {
  sucesso: boolean;
  mensagem: string;
  dados: ResponsavelTipo[];
}

export interface ResponsavelTipo {
  responsavel_tipo_id: number;
  descricao: string;
}
