import { SIGLAS_ESTADOS } from './../../../../constantes/estados';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrar-perfil',
  templateUrl: './cadastrar-perfil.component.html',
  styleUrls: ['./cadastrar-perfil.component.scss']
})
export class CadastrarPerfilComponent implements OnInit {

  estados = SIGLAS_ESTADOS;

  constructor() { }

  ngOnInit() {
  }

}
