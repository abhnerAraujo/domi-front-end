import { PacientesService } from './../services/pacientes/pacientes.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pacientes-lista',
  templateUrl: './pacientes-lista.component.html',
  styleUrls: ['./pacientes-lista.component.scss']
})
export class PacientesListaComponent implements OnInit {

  pacientes: any[];

  constructor(public location: Location, private pacienteService: PacientesService) { }

  ngOnInit() {
    this.carregarPacientes();
  }

  carregarPacientes() {
    this.pacienteService.listar(null)
      .subscribe(resultado => {
        if (!!resultado.data && resultado.data.length) {
          this.pacientes = resultado.data;
        }
      });
  }

}
