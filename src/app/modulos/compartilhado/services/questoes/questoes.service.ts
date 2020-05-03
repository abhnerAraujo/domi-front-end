import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class QuestoesService {

  constructor(private http: HttpClient) { }

  salvar(atendimentoId: number, dados: any) {
    return this.http
      .post<any>(`atendimentos/${atendimentoId}/anamnese-avaliacao`, dados);
  }

  editar(atendimentoId: number, anamneseAvaliacaoid: number, dados: any) {
    return this.http
      .put<any>(`atendimentos/${atendimentoId}/anamnese-avaliacao/${anamneseAvaliacaoid}`, dados);
  }

}
