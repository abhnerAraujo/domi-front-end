export interface LoginResponse {
  sucesso: boolean;
  mensagem: string;
  dados: Dados;
}

export interface Dados {
  id: string;
  dados: LoginDadosUsuario;
}

export interface LoginDadosUsuario {
  email_confirmacao: boolean;
  data_nascimento: string;
  primeiro_nome: string;
  created_at: string;
  updated_at: string;
  sobrenome: string;
  deleted_at: string;
  senha: string;
  entrar_direto: boolean;
  auth_codigo: number;
  email: string;
}
