import { ListarPacientesResponse } from './../../interfaces/listar-pacientes-response.interface';
import { DetalharPacienteResponse } from './../../interfaces/detalher-paciente-response.interface';
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

  listar(filtro: any) {
    return this.http
      .get<ListarPacientesResponse>('pacientes', { params: filtro });
  }

  detalhar(pacienteId: number) {
    return this.http
      .get<DetalharPacienteResponse>(`pacientes/${pacienteId}`);
  }

  editar(pacienteId: number, paciente: SalvarPacienteRequest) {
    return this.http
      .put<any>(`pacientes/${pacienteId}`, paciente);
  }
}
