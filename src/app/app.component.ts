import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'talkaboat_hosting';

  constructor(private readonly auth: AuthService) {}

  async ngOnInit() {
    this.auth.appleSignIn();
    if(!this.auth.isLoggedIn) {
      this.auth.googleSignIn();
    }
  }
}
