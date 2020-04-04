export interface Atendimento {
  atendimento_id: number;
  paciente: number;
  data_inicio: string;
  data_terminio: string;
  estrategia_geral: string;
  objetivo_geral: string;
  queixa: string;
  utensilios_materiais: string;
  profissional: string;
  valor_padrao: number;
  diagnostico: string;
  hipotese_diagnostica_especifica: string;
}

export interface DetalharAtendimentoRequest {
  sucesso: boolean;
  mensagem: string;
  dados: Atendimento[];
}
