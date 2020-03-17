export interface CriarAtendimentoRequest {
  data_inicio: string;
  paciente: number;
}

export interface CriarAtendimentoResponse {
  mensagem: string;
  dados: CriarAtendimentoDados;
  sucesso: boolean;
  erro: any;
}

export interface CriarAtendimentoDados {
  atendimento_id: number;
}
