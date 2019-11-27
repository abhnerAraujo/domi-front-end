export interface DiaAtendimento {
  id: number;
  diaSemana: number;
  hora: string;
  qtdSessoes: number;
  duracao: number;
  selecionado?: boolean;
  travarBotoes?: boolean;
}
