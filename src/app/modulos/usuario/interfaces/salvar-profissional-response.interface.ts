export interface SalvarProfissionalResponse {
  sucesso: boolean;
  mensagem: string;
  dados: SalvarProfissionalDados;
}

export interface SalvarProfissionalDados {
  profissional_id: number;
  espaco_id: number;
}
