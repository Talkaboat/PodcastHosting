import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { WebsiteStateService } from 'src/app/services/website-state/website-state.service';

@Component({
  selector: 'app-back-navigation',
  templateUrl: './back-navigation.component.html',
  styleUrls: ['./back-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackNavigationComponent implements OnInit {

  constructor( private readonly websiteStateService: WebsiteStateService) {}

  ngOnInit(): void {
  }


  canNavigateBack() {
    const canNavigateBack = this.websiteStateService.canNavigateBack();
    console.log(canNavigateBack);
    return canNavigateBack;
  }

  navigateBack() {
    this.websiteStateService.backNavigation();
  }

}
