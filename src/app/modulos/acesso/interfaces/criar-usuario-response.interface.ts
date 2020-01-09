export interface CriarUsuarioResponse {
  sucesso: boolean;
  mensagem: string;
  dados: CriarUsuarioDados[];
}

export interface CriarUsuarioDados {
  id: string;
}
