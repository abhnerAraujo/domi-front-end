export interface DetalharPacienteResponse {
  sucesso: boolean;
  mensagem: string;
  dados: Paciente;
}

export interface Paciente {
  paciente_id: number;
  nome_completo: string;
  sexo: string;
  data_nascimento?: string;
  email?: string;
  escolaridade: number;
  profissional_criador: number;
  telefones: Telefone[];
  enderecos: Endereco[];
  responsaveis: Responsavel[];
}

export interface Responsavel {
  paciente_responsavel_id: number;
  nome_responsavel: string;
  responsavel_tipo: number;
  telefone_responsavel: string;
  tipo_telefone_responsavel: string;
}

export interface Telefone {
  telefone_paciente_id: number;
  telefone: string;
  tipo: string;
}

export interface Endereco {
  endereco_paciente_id: number;
  logradouro: string;
  numero: string;
  complemento: string;
  cep: string;
  bairro: string;
  cidade: string;
  estado: string;
}
