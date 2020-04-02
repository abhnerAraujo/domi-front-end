export interface SalvarSessaoRequest {
  quantidade: number;
  duracao: number;
}

export interface SalvarSessaoResponse {
  dados: SalvarSessaoDados;
}

export interface SalvarSessaoDados {
  sessao: SessaoSalva;
}

export interface SessaoSalva {
  sessao_id: number;
}

export interface IniciarSessaoResponse {
  sucesso: boolean;
  dados: IniciarSessaoDados;
}

export interface IniciarSessaoDados {
  hora_inicio: string;
  agora: string;
  tempo_corrido: number;
}
