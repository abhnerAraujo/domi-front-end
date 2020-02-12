export interface DadosUsuarioResponse {
  sucesso: boolean;
  dados: DadosUsuario;
  mensagem: string;
}

export interface DadosUsuario {
  usuario: Usuario;
  perfis: Perfil[];
}

export interface Perfil {
  profissional_id: number;
  numero_inscricao: string;
  inscricao_data: string;
  profissional_tipo: number;
  profissional_tipo_descricao: string;
  espacos: Espaco[];
}

export interface Espaco {
  espaco_id: number;
  descricao: string;
  padrao: boolean;
}

interface Usuario {
  primeiro_nome: string;
  sobrenome: string;
  usuario_id: number;
  email_confirmacao: boolean;
  entrar_direto: boolean;
  email: string;
  sexo: string;
  data_nascimento: string;
}
