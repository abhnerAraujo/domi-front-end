import { Espaco } from './../../../acesso/interfaces/dados-usuario-response.interface';
import { EspacoService } from '../../services/espaco/espaco.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-espacos-lista',
  templateUrl: './espacos-lista.component.html',
  styleUrls: ['./espacos-lista.component.scss'],
  providers: [EspacoService]
})
export class EspacosListaComponent implements OnInit {

  espacos: Espaco[];

  constructor(private espacosService: EspacoService) { }

  ngOnInit() {
    this.carregarEspacos();
  }

  carregarEspacos() {
    this.espacosService.listar()
      .subscribe(r => this.espacos = r.dados);
  }

}
