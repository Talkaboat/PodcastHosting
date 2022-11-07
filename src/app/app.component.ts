import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { WebsiteStateService } from './services/website-state/website-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'talkaboat_hosting';

  isLoginModalOpen = false;

  constructor(private readonly auth: AuthService, private readonly websiteStateService: WebsiteStateService) {}

  async ngOnInit() {
    this.auth.logout();
    this.websiteStateService.onLoginModalStateChanged.subscribe(state => this.isLoginModalOpen = state);
  }
}
