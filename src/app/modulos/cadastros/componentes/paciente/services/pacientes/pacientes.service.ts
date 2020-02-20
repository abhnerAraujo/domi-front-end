import { SalvarPacienteResponse } from './../../interfaces/salvar-paciente-response.interface';
import { SalvarPacienteRequest } from './../../interfaces/salvar-paciente-request.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor(private http: HttpClient) { }

  criar(dados: SalvarPacienteRequest): Observable<SalvarPacienteResponse> {
    return this.http
      .post<SalvarPacienteResponse>('pacientes', dados);
  }
}
