export interface EditarPlanejamentoRequest {
  planejamento_texto: string;
}

export interface EditarPlanejamentoResponse {
  mensagem: string;
  sucesso: boolean;
}
