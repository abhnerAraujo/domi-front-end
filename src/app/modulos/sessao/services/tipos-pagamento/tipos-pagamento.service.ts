import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TiposPagamentoResponse } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class TiposPagamentoService {

  constructor(private http: HttpClient) { }

  tiposPagamento() {
    return this.http
      .get<TiposPagamentoResponse>(`tipos-pagamento`);
  }
}
