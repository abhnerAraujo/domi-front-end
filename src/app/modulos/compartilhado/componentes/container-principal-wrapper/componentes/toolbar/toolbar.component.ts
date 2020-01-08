import { Router } from '@angular/router';
import { Usuario } from './../../../../../acesso/interfaces/usuario.interface';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() toggleSidenav: EventEmitter<void>;

  usuario: Usuario;

  constructor(private router: Router) {
    this.toggleSidenav = new EventEmitter();
  }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('x-user-data'));
  }

  sair() {
    localStorage.clear();
    this.router.navigate(['/acessar']);
  }

}
