import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TranslateService } from 'src/app/services/i18n/translate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private readonly authService: AuthService, private readonly translateService: TranslateService) { }

  ngOnInit(): void {
  }

  async toggleLanguage() {
    this.translateService.toggle();
  }

}
