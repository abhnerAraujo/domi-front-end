export interface Agendamento {
  agendamento_id: number;
  atendimento: number;
  agendamento_data: string;
  quantidade: number;
  duracao: number;
  titulo: string;
  valor_sessao: number;
  evento_google_id: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface CriarAgendamentoRespone {
  sucesso: boolean;
  mensagem: string;
  dados: Agendamento;
}

export interface ListarAgendamentosResponse {
  sucesso: boolean;
  mensagem: string;
  dados: Agendamento[];
}