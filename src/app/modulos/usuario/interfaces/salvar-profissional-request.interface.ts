export interface SalvarProfissionalRequest {
  numero_inscricao: string;
  inscricao_uf: string;
  inscricao_data: string;
  ativo: boolean;
  inscricao_tipo: number;
  profissional_tipo: number;
  conselho?: number;
  espaco: SalvarProfissionalEspaco;
}

export interface SalvarProfissionalEspaco {
  descricao: string;
  padrao: boolean;
}
