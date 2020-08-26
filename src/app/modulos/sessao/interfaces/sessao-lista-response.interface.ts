import { Pagamento } from './pagamentos.interface';

export interface Sessao {
  sessao_id: number;
  atendimento: number;
  sessao_data: string;
  hora_inicio: string;
  hora_fim: string;
  quantidade: number;
  duracao: number;
  tempo_corrido: number;
  utensilios_especificos?: any;
  objetivos_especificos?: any;
  estrategias_especificas?: any;
  evolucao: string;
  nota_geral: number;
  valor_sessao: number;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  pagamentos?: Pagamento[];
  falta: boolean;
}

export interface ListarSessoesResponse {
  sucesso: boolean;
  mensagem: string;
  dados: Sessao[];
}
