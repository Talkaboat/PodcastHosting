import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SigninComponent implements OnInit, OnDestroy {

  email = "";

  modalForm : FormGroup = this.formBuilder.group({
    email: [this.email, [Validators.required, Validators.email]]
  });

  subscriptions: Subscription[] = [];

  constructor(private readonly formBuilder: FormBuilder, private readonly authService: AuthService, private readonly router: Router) { }

  ngOnInit(): void {
    this.forwardIfLoggedIn();
    this.subscriptions.push(this.authService.authenticationStateChanged.subscribe(state => {
      this.forwardIfLoggedIn();
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  forwardIfLoggedIn() {
    if(this.authService.isLoggedIn) {
      this.router.navigate(['home']);
    }
  }

  requestPin() {
    this.authService.emailSignIn(this.email);
  }

  signInWithGoogle() {
    this.authService.googleSignIn();
  }

  signInWithApple() {
    this.authService.appleSignIn();
  }

  signInWithFacebook() {
    this.authService.facebookSignIn();
  }

}
