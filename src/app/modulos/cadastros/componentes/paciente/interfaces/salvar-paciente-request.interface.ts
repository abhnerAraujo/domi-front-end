export interface SalvarPacienteRequest {
  paciente_id?: number;
  profissional_criador: number;
  nome_completo: string;
  sexo: string;
  email?: string;
  escolaridade?: string;
  data_nascimento?: string;
  responsaveis?: Responsavel[];
  telefones?: Telefone[];
  enderecos?: Endereco[];
}

export interface Responsavel {
  paciente_responsavel_id?: number;
  nome_responsavel: string;
  responsavel_tipo: number;
  telefone_responsavel: string;
  tipo_telefone_responsavel: string;
  excluido?: boolean;
}

export interface Telefone {
  telefone_paciente_id?: number;
  telefone: string;
  tipo: string;
  excluido?: boolean;
}

export interface Endereco {
  endereco_paciente_id?: number;
  logradouro: string;
  numero: string;
  complemento: string;
  cep: string;
  bairro: string;
  cidade: string;
  estado: string;
  excluido?: boolean;
}
