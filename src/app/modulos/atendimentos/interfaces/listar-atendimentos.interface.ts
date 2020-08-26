export interface ListarAtendimentosResponse {
  sucesso: boolean;
  mensage: string;
  erro: any;
  dados: ListarAtendimentosDados[];
}

export interface ListarAtendimentosDados {
  paciente_id: number;
  nome_completo: string;
  data_inicio: string;
  atendimento_id: number;
  hoje: boolean;
  amanha: boolean;
  configuracoes?: Configuracao;
}

export interface Configuracao {
  atendimento_configuracao_id: number;
  atendimento: number;
  dia_semana: number;
  hora_inicio: Date;
  quantidade: number;
  valor_sessao?: any;
  created_at: Date;
  updated_at: Date;
  deleted_at?: any;
  duracao: number;
}
