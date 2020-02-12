import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

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
      return false;
    }
  }

}
