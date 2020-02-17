import { DadosUsuario } from './../../../acesso/interfaces/dados-usuario-response.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dadosUsuario: DadosUsuario;

  constructor() { }

  ngOnInit() {
    this.dadosUsuario = JSON.parse(localStorage.getItem('x-user-info'));
  }

}
