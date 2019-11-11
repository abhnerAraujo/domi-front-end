import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acessar',
  templateUrl: './acessar.component.html',
  styleUrls: ['./acessar.component.scss']
})
export class AcessarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  entrar() {
    const milli = new Date().getMilliseconds();
    const usuario = {
      nome: 'Abhner Araujo',
      email: 'abhnerfelipe@gmail.com'
    };
    localStorage.setItem('x-access-token', `${milli}`);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.router.navigate(['home']);
  }

}
