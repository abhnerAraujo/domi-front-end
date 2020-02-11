export interface LoginResponse {
  sucesso: boolean;
  mensagem: string;
  dados: Dados;
}

export interface Dados {
  token: string;
}
