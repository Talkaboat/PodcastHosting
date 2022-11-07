import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthorizationResponse } from './models/authorization-response.model';
import { AUTH_API } from './auth-urls.const';
import { RepositoryService } from '../repository.service';
import { ResponseModel } from './models/response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthRepositoryService extends RepositoryService {

  requestLogin(wallet: string): Observable<AuthorizationResponse> {
    if (!wallet) {
      return of();
    }
    const api = AUTH_API.URL + AUTH_API.REQUEST_LOGIN_URL.replace('{wallet}', wallet);
    return this.post<AuthorizationResponse>(api);
  }

  requestEmailLogin(email: string): Observable<ResponseModel> {
    if (!email) {
      return of();
    }
    const api = AUTH_API.URL + AUTH_API.REQUEST_EMAIL_LOGIN_URL.replace('{email}', email);
    return this.post<ResponseModel>(api);
  }

  login(wallet: string, signature: string): Observable<AuthorizationResponse> {
    if (!wallet) {
      return of();
    }
    const api = AUTH_API.URL + AUTH_API.LOGIN_URL;
    const body = { address: wallet, signature };
    return this.post<AuthorizationResponse>(api, body);
  }

  loginByEmail(email: string, pin: string): Observable<AuthorizationResponse> {
    if (!email || !pin) {
      return of();
    }
    const api = AUTH_API.URL + AUTH_API.EMAIL_LOGIN_URL;
    const body = { address: email, signature: pin };
    return this.post<AuthorizationResponse>(api, body);
  }

  loginFirebase(token: string): Observable<ResponseModel> {
    if (!token) {
      return of();
    }
    const api = AUTH_API.URL + AUTH_API.REQUEST_FIREBASE_LOGIN_URL;
    const body = { text: token };
    return this.post<ResponseModel>(api, body);
  }

  verifyFirebase(token: string, pin: string): Observable<ResponseModel> {
    if (!token) {
      return of();
    }
    const api = AUTH_API.URL + AUTH_API.VERIFY_FIREBASE_LOGIN_URL.replace("{pin}", pin);
    const body = { text: token };
    return this.post<ResponseModel>(api, body);
  }

  connectFirebase(token: string) {
    const api = AUTH_API.URL + AUTH_API.FIREBASE_CONNECT_URL;
    return this.put(api, { text: token })
  }
}
