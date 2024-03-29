import { EventEmitter, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '../i18n/translate.service';
import { LoaderService } from '../loader/loader.service';
import { Subscription, Observable, of } from 'rxjs';
import { AuthRepositoryService } from '../repository/auth-repository/auth-repository.service';
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { WebsiteStateService } from '../website-state/website-state.service';
import { ResponseModel } from '../repository/auth-repository/models/response.model';
import { ModalState } from 'src/app/components/default/modal/models/modal-state.model';
import { Auth } from '@angular/fire/auth';
import { AuthorizationResponse } from '../repository/auth-repository/models/authorization-response.model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  logout() {
    localStorage.setItem(this.tokenAccessIdentifier, '');
    localStorage.setItem('social_login', 'false');
    this.auth.signOut();
  }
  user: any;
  private connectSub: Subscription = new Subscription();
  private _token: string | null = null;
  private readonly tokenAccessIdentifier = 'aboat_web_access';

  get token(): string {
    if (this._token == null) {
      this._token = localStorage.getItem(this.tokenAccessIdentifier) ?? '';
    }
    return this._token;
  }
  get isLoggedIn(): boolean {
    this._token = localStorage.getItem(this.tokenAccessIdentifier);
    const isAuthenticated =
      this._token != null && !this.jwtHelper.isTokenExpired(this._token);
    return isAuthenticated;
  }
  authenticationStateChanged = new EventEmitter<boolean>();
  constructor(
    private readonly auth: Auth,
    private readonly loadingService: LoaderService,
    private readonly toastrService: ToastrService,
    private readonly translateService: TranslateService,
    private readonly jwtHelper: JwtHelperService,
    private readonly authRepository: AuthRepositoryService,
    private readonly websiteState: WebsiteStateService
  ) {
    this.auth.onAuthStateChanged(async (user) => {
      loadingService.show();
      this.user = user;
      if (user) {
        this._token = await user.getIdToken(true);
        localStorage.setItem('social_login', 'true');
        authRepository
          .loginFirebase(this._token)
          .subscribe((response) => this.handleResponse(response));
      } else {
        loadingService.hide();
      }
    });
  }

  handleResponse(response: ResponseModel) {
    switch (response.text) {
      case 'connected':
        this.setToken(response.data);
        break;
      case 'not_connected':
        this.openPinVerificationModal();
        break;
    }

    this.loadingService.hide();
  }

  setToken(token: string | undefined) {
    if (!token) {
      return;
    }
    this._token = token;
    localStorage.setItem(this.tokenAccessIdentifier, token);
    this.authenticationStateChanged.emit(true);
  }

  openPinVerificationModal(email: string = '') {
    this.websiteState.modalState = this.getPinVerificationModal(email);
    this.websiteState.onLoginModalStateChanged.emit(true);
  }

  getPinVerificationModal(email: string): ModalState {
    return {
      title: 'confirmPin',
      placeholder: 'Pin',
      useTextField: true,
      onSubmit: (pin: any) => {
        if (email) {
          this.verifyEmailPin(email, pin);
        } else {
          this.verifyFirebasePin(pin);
        }
      },
      onClose: () => {},
    };
  }

  verifyEmailPin(email: string, pin: string) {
    this.authRepository.loginByEmail(email, pin).subscribe({
      next: (response) => {
        this.setToken(response.token);
        this.handleSuccess('successLogin');
        this.websiteState.onLoginModalStateChanged.emit(false);
      },
      error: (response: HttpErrorResponse) => {
        this.handleError(response.error.message);
      }
    });
  }

  verifyFirebasePin(pin: string) {
    this.authRepository
      .verifyFirebase(this.token, pin)
      .subscribe((response) => {
        this.handleResponse(response);
        this.websiteState.onLoginModalStateChanged.emit(false);
      });
  }

  googleSignIn() {
    if (getAuth().currentUser) {
      return;
    }
    this.loadingService.show();
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    signInWithPopup(this.auth, provider)
      .then((result) => {})
      .catch((error) => {})
      .finally(() => {
        this.loadingService.hide();
      });
  }

  appleSignIn() {
    if (getAuth().currentUser) {
      return;
    }

    this.loadingService.show();
    const provider = new OAuthProvider('apple.com');
    provider.addScope('email');
    this.loadingService.show();
    signInWithPopup(this.auth, provider)
      .then((result) => {})
      .catch((error) => {})
      .finally(() => {
        this.loadingService.hide();
      });
  }

  facebookSignIn() {
    if (getAuth().currentUser) {
      return;
    }
    const provider = new FacebookAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    this.loadingService.show();
    signInWithPopup(this.auth, provider)
      .then((result) => {})
      .catch((error) => {})
      .finally(() => {
        this.loadingService.hide();
      });
  }

  emailSignIn(email: string) {
    if (this.isLoggedIn) {
      return;
    }
    this.loadingService.show();
    this.authRepository.requestEmailLogin(email).subscribe({
      next: (response: ResponseModel) => {
        if (response.text == 'new_account') {
          this.handleError('user_not_found');
          return;
        }
        this.openPinVerificationModal(email);
      },
      error: (response: HttpErrorResponse) => {
        this.handleError(response.error.message);
      },
    });
  }

  handleSuccess(successText: string) {
    this.loadingService.hide();
    this.toastrService.success(this.translateService.transform(successText));
  }

  handleError(errorText: string) {
    this.loadingService.hide();
    this.toastrService.error(this.translateService.transform(errorText));
  }
}
