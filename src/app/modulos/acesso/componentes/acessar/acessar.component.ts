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
    localStorage.setItem('x-access-token', `${milli}`);
    this.router.navigate(['home']);
  }

}
