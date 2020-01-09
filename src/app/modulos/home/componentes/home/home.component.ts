import { Usuario } from './../../../acesso/interfaces/usuario.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  usuario: Usuario;

  constructor() { }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('x-user-data'));
  }

}
