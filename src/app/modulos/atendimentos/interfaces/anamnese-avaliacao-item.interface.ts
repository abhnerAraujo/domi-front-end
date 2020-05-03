export interface AnamneseAvaliacaoItem {
  anamnese_avaliacao_item_id: number;
  tipo: string;
  item: string;
  resposta: string;
  sessao: number;
}

export interface AnamneseAvaliacaoListar {
  mensagem: string;
  sucesso: boolean;
  dados: AnamneseAvaliacaoItem[];
}
