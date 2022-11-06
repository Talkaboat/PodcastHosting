import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {

  show = false;
  private subscriptions: Subscription[] = [];

  constructor(private readonly loaderService: LoaderService) { }

  ngOnInit() {
    this.subscriptions.push(this.loaderService.onLoadingStateChanged
      .subscribe((state: boolean) => {
        this.show = state;
      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
