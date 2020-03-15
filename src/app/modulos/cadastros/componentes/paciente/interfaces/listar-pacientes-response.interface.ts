export interface Paciente {
  paciente_id: number;
  nome_completo: string;
  data_nascimento: string;
}

export interface ListarPacientesResponse {
  sucesso: boolean;
  mensagem: string;
  dados: Paciente[];
}
