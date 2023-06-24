import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { TradeHistory } from 'src/app/services/repository/trade-repository/models/trade-history.model';
import { TradeRepositoryService } from 'src/app/services/repository/trade-repository/trade-repository.service';
import { TokenService } from 'src/app/services/token-service/token.service';

@Component({
  selector: 'app-recent-trade-list',
  templateUrl: './recent-trade-list.component.html',
  styleUrls: ['./recent-trade-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentTradeListComponent implements OnInit {
  currentOffset = 0;
  amountPerPage = 4;
  _address: string = '';
  _wallet: string = '';
  get address() {
    return this._address;
  }
  @Input() set address(value: string) {
    if (this.address != '' && this.address != value) {
      this._address = value;
      this.getRecentTrades();
      this.tradeHistory = undefined;
      return;
    }
    this._address = value;
  }
  get wallet() {
    return this._wallet;
  }
  @Input() set wallet(value: string) {
    if (this.wallet != '' && this.wallet != value) {
      this._wallet = value;
      this.tradeHistory = undefined;
      this.getRecentTrades();
      return;
    }
    this._wallet = value;
  }
  tradeHistory: TradeHistory | undefined;
  interval: Subscription | undefined;
  constructor(
    private readonly tradeRepository: TradeRepositoryService,
    private readonly tokenService: TokenService,
    private readonly ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.interval = interval(3000).subscribe(() => {
      this.getRecentTrades();
    });
  }

  ngOnDestroy() {
    this.interval?.unsubscribe();
  }


  nextPage() {
    if(!this.tradeHistory || !this.tradeHistory!.trades || this.tradeHistory.total <= this.currentOffset + this.amountPerPage) return;
    this.currentOffset = this.currentOffset + this.amountPerPage;
    this.getRecentTrades();
  }

  previousPage() {
    if(!this.tradeHistory || !this.tradeHistory!.trades || this.currentOffset <= 0) return;
    this.currentOffset = Math.max(0, this.currentOffset - this.amountPerPage);
    this.getRecentTrades();
  }

  getRecentTrades() {
    this.tradeRepository
      .getRecentTrades(this.wallet, this.address, this.currentOffset, this.amountPerPage)
      .subscribe((result) => {
        var isNew =
          false ||
          this.tradeHistory == undefined ||
          this.tradeHistory.trades.length == 0;
          if(!isNew) {
            for(var i = 0; i < result.trades.length; i++) {
              var trade1 = this.tradeHistory?.trades.at(i);
              var trade2 = result.trades.at(i);
              if(trade1?.txHash != trade2?.txHash || trade1?.chainId != trade2?.chainId) {
                isNew = true;
              }
            }
          }
        if (isNew) {
          this.tradeHistory = result;
          this.ref.detectChanges();
          if (this.tradeHistory && this.tradeHistory.trades) {
            this.tradeHistory.trades.forEach(async (trade) => {
              trade.tokenInData = await this.tokenService.mapAddressToToken(
                trade.tokenIn,
                trade.chainId
              );
              trade.tokenOutData = await this.tokenService.mapAddressToToken(
                trade.tokenOut,
                trade.chainId
              );
              this.ref.detectChanges();
            });
          }
        }
      });
  }
}
