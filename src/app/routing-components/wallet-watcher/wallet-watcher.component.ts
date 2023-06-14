import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './wallet-watcher.component.html',
  styleUrls: ['./wallet-watcher.component.scss']
})
export class WalletWatcherComponent implements OnInit {
  subscriptions: Subscription[] = [];
  walletAddress: string = '';
  constructor(
    private readonly route: ActivatedRoute,
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {

    this.subscriptions.push(
      this.route.params.subscribe((params: any) => {
        this.walletAddress = params['address'];
        console.log(this.walletAddress);
      })
    );
  }

}
