import { ChangeDetectionStrategy, Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { TradeHistory } from 'src/app/services/repository/trade-repository/models/trade-history.model';
import { TradeRepositoryService } from 'src/app/services/repository/trade-repository/trade-repository.service';
import { TokenService } from 'src/app/services/token-service/token.service';

@Component({
  selector: 'app-recent-trade-list',
  templateUrl: './recent-trade-list.component.html',
  styleUrls: ['./recent-trade-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentTradeListComponent implements OnInit {
  _address: string = '';
  _wallet: string = '';
  get address() { return this._address; }
  @Input() set address(value: string) {
    if(this.address != '' && this.address != value) {
      this._address = value;
      this.getRecentTrades();
      this.tradeHistory = undefined;
      return;
    }
    this._address = value;
  }
  get wallet() { return this._wallet; }
  @Input() set wallet(value: string) {
    if(this.wallet != '' && this.wallet != value) {
      this._wallet = value;
      this.tradeHistory = undefined;
      this.getRecentTrades();
      return;
    }
    this._wallet = value;
  }
  tradeHistory: TradeHistory | undefined;
  constructor(private readonly tradeRepository: TradeRepositoryService, private readonly tokenService: TokenService, private readonly ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getRecentTrades();
  }

  getRecentTrades() {
    this.tradeRepository.getRecentTrades(this.wallet, this.address, 0, 10).subscribe(result => {
      this.tradeHistory = result;
      this.ref.detectChanges();
      if(this.tradeHistory && this.tradeHistory.trades) {
      this.tradeHistory.trades.forEach(async trade => {
        trade.tokenInData = await this.tokenService.mapAddressToToken(trade.tokenIn, trade.chainId);
        trade.tokenOutData = await this.tokenService.mapAddressToToken(trade.tokenOut, trade.chainId);
        this.ref.detectChanges();
      });
    }
    });
  }

}
