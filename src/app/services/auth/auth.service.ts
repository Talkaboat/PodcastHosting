import { EventEmitter, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '../i18n/translate.service';
import { LoaderService } from '../loader/loader.service';
import { Subscription } from 'rxjs';
import { AuthRepositoryService } from '../repository/auth-repository/auth-repository.service';
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, OAuthProvider, signInWithPopup } from 'firebase/auth';
import { WebsiteStateService } from '../website-state/website-state.service';
import { ResponseModel } from '../repository/auth-repository/models/response.model';
import { ModalState } from 'src/app/components/default/modal/models/modal-state.model';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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
        if (localStorage.getItem('connectSocial')) {
          localStorage.removeItem('connectSocial');
          if (this.isLoggedIn) {
            this.connectFirebaseToUser();
          }
          else {
            this.connectSub = this.authenticationStateChanged.subscribe(
              (state) => {
                if (state) {
                  this.connectFirebaseToUser();
                  this.connectSub.unsubscribe();
                }
              }
            );
          }
        } else {
          localStorage.setItem('social_login', 'true');
          authRepository
            .loginFirebase(this._token)
            .subscribe((response) => this.handleResponse(response));
        }
      } else {
        loadingService.hide();
      }
    });
  }

  handleResponse(response: ResponseModel) {
    switch (response.text) {
      case 'connected': this.getLoginToken(response.data); break;
      case 'not_connected': this.openPinVerificationModal(); break;
    }

    this.loadingService.hide();
  }

  getLoginToken(token: string | undefined) {
    if (!token) {
      return;
    }
    this._token = token;
    localStorage.setItem(this.tokenAccessIdentifier, token);
    this.authenticationStateChanged.emit(true);
  }

  openPinVerificationModal() {
    this.websiteState.modalState = this.getPinVerificationModal();
    this.websiteState.onLoginModalStateChanged.emit(true);
  }

  getPinVerificationModal(): ModalState {
    return {
      title: "verify_pin",
      placeholder: "Pin",
      useTextField: true,
      onSubmit: (pin: any) => { this.verifyPin(pin); },
      onClose: () => { }
    };
  }

  verifyPin(pin: string) {
    this.authRepository.verifyFirebase(this.token, pin).subscribe((response) => {
      this.handleResponse(response);
    });
  }

  googleSignIn() {
    if (getAuth().currentUser) {
      return;
    }
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    signInWithPopup(this.auth, provider);
  }

  appleSignIn() {
    if (getAuth().currentUser) {
      return;
    }
    const provider = new OAuthProvider("com.apple");
    this.loadingService.show();
    signInWithPopup(this.auth, provider).then(result => {
      console.log(result);
    }).catch(error => {
      console.log(error);
    }).finally(() => {
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
    signInWithPopup(this.auth, provider);
  }

  connectFirebaseToUser() {
    this.authRepository.connectFirebase(this.token).subscribe({
      next: (_) => {
        this.toastrService.success(
          this.translateService.transform('connect_firebase_success')
        );
      },
      error: async (response) => {
        this.loadingService.hide();
        this.toastrService.error(
          this.translateService.transform(response.error.message)
        );
        await this.auth.signOut();
      },
      complete: () => this.loadingService.hide(),
    });
  }
}
