import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AcessoGuard implements CanActivate {
  constructor(private router: Router, private auth: AngularFireAuth) { }

  canActivate(): boolean {
    if (localStorage.getItem('x-access-token') && this.auth.user) {
      return true;
    } else {
      this.router.navigate(['acessar']);
      localStorage.clear();
      return false;
    }
  }

}
