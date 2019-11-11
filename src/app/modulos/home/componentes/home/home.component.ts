import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  nomeUsuario: string;

  constructor() { }

  ngOnInit() {
    this.nomeUsuario = JSON.parse(localStorage.getItem('usuario')).nome;
  }

}
