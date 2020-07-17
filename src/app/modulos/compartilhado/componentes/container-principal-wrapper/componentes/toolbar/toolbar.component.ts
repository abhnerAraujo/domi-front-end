import { AuthService } from './../../../../services/auth/auth.service';
import { DadosUsuario } from './../../../../../acesso/interfaces/dados-usuario-response.interface';
import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() toggleSidenav: EventEmitter<void>;
  @Output() toggleSidenavDireito: EventEmitter<void>;

  dadosUsuario: DadosUsuario;

  constructor(private router: Router, private authService: AuthService) {
    this.toggleSidenav = new EventEmitter();
    this.toggleSidenavDireito = new EventEmitter();
  }

  ngOnInit() {
    this.dadosUsuario = JSON.parse(localStorage.getItem('x-user-data'));
  }

  sair() {
    localStorage.clear();
    this.authService.logout()
      .then(r => this.router.navigate(['/acessar']));
  }

}
