import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AcessoGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    if (localStorage.getItem('x-access-token')) {
      return true;
    } else {
      this.router.navigate(['acessar']);
      localStorage.clear();
      return false;
    }
  }

}
