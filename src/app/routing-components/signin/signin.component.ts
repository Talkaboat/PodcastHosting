import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SigninComponent implements OnInit {

  email = "";
  pin = "";

  isPinRequired = false;
  modalForm : FormGroup = this.formBuilder.group({
    email: [this.email, [Validators.required, Validators.email]],
    pin: [this.pin, [Validators.required]]
  });

  subscriptions: Subscription[] = [];

  constructor(private readonly formBuilder: FormBuilder, private readonly authService: AuthService) { }

  ngOnInit(): void {
    this.forwardIfLoggedIn();
    this.subscriptions.push(this.authService.authenticationStateChanged.subscribe(state => {
      this.forwardIfLoggedIn();
    }));
  }

  forwardIfLoggedIn() {
    if(this.authService.isLoggedIn) {
      console.log("isLoggedIn!");
    }
  }

  requestPin() {
    this.isPinRequired = true;
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
