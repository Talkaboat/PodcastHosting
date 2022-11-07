import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from "./auth.service";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ){ }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isAuthenticated = this.authService.isLoggedIn;
    if(isAuthenticated !== true && !next.routeConfig?.path?.includes('sign-in')) {
      this.router.navigate(['sign-in']);
    } else if(isAuthenticated && !next.routeConfig?.path?.includes('home') ) {
      this.router.navigate(['home']);
    }
    return true;
  }
}
