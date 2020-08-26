export interface SalvarPacienteResponse {
  sucesso: boolean;
  mensagem: string;
  dados: SalvarPacienteDados;
}

export interface SalvarPacienteDados {
  paciente_id: number;
}
