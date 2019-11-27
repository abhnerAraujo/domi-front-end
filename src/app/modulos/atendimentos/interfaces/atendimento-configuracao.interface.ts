import { DiaAtendimento } from './dia-atendimento.interface';

export interface AtendimentoConfiguracao {
  valor_sessao: number;
  atendimento_dias: DiaAtendimento[];
}
