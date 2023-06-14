import { ChangeDetectionStrategy, Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { TradeHistory } from 'src/app/services/repository/trade-repository/models/trade-history.model';
import { TradeModel } from 'src/app/services/repository/trade-repository/models/trade.model';
import { TradeRepositoryService } from 'src/app/services/repository/trade-repository/trade-repository.service';
import { TokenService } from 'src/app/services/token-service/token.service';

@Component({
  selector: 'app-recent-trade-list',
  templateUrl: './recent-trade-list.component.html',
  styleUrls: ['./recent-trade-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentTradeListComponent implements OnInit {
  @Input() address: string = '';
  @Input() wallet: string = '';
  tradeHistory: TradeHistory | undefined;
  constructor(private readonly tradeRepository: TradeRepositoryService, private readonly tokenService: TokenService, private readonly ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.tradeRepository.getRecentTrades(this.wallet, this.address, 0, 10).subscribe(result => {
      this.tradeHistory = result;
      this.ref.detectChanges();
      if(this.tradeHistory && this.tradeHistory.trades) {
      this.tradeHistory.trades.forEach(async trade => {
        trade.tokenInModel = await this.tokenService.mapAddressToToken(trade.tokenIn, trade.chainId);
        trade.tokenOutModel = await this.tokenService.mapAddressToToken(trade.tokenOut, trade.chainId);
        this.ref.detectChanges();
      });
    }
    });
  }

}
