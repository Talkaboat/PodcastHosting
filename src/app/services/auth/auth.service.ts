import { EventEmitter, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _token: string | null = null;
  private readonly tokenAccessIdentifier = 'aboat_web_access';
  constructor(
    private readonly toastr: ToastrService,
    private readonly jwtHelper: JwtHelperService) { }
  get token(): string {
    if(this._token == null) {
      this._token = localStorage.getItem(this.tokenAccessIdentifier) ?? '';
    }
    return this._token;
  }
  get isLoggedIn(): boolean {
    this._token = localStorage.getItem(this.tokenAccessIdentifier);
    const isAuthenticated = this._token != null && !this.jwtHelper.isTokenExpired(this._token);
    return isAuthenticated;
  }
  authenticationStateChanged = new EventEmitter<boolean>();
}
