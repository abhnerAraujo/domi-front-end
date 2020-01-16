import { ListarEspacosResponse } from './../../interfaces/listar-espacos-response.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EspacoService {

  constructor(private http: HttpClient) { }

  listar(): Observable<ListarEspacosResponse> {
    return this.http
      .get<ListarEspacosResponse>('espaco');
  }
}
