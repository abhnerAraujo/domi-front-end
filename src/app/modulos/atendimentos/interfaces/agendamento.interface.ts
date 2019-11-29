export interface Agendamento {
  agendamento_id: number;
  paciente_id: number;
  atendimento_id: number;
  agendamento_data: string;
  quantidade_sessoes: number;
  tempo_sessao: number;
  hora_inicio_sessao: string;
}
