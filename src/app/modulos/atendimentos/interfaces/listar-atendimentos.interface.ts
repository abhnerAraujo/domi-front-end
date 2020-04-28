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
}
