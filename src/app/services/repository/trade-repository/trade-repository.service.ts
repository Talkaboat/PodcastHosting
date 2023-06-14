import { Injectable } from '@angular/core';
import { RepositoryService } from '../repository.service';
import { Observable } from 'rxjs';
import { TRADE_API } from './trade-urls.const';
import { TradeModel } from './models/trade.model';
import { TradeHistory } from './models/trade-history.model';

@Injectable({
  providedIn: 'root'
})
export class TradeRepositoryService extends RepositoryService{

  public getRecentTrades(address?: string, token?: string, skip?: number, amount?: number, sort?: number): Observable<TradeHistory> {
    if(!skip) {
      skip = 0;
    }
    if(!amount) {
      amount = 10;
    }
    if(!sort) {
      sort = 1;
    }

    const api = TRADE_API.URL + `?Trader=${address}&Token=${token}&Skip=${skip}&Take=${amount}&Sort=${sort}`;
    return this.get(api);
  }

  public addToWatchlist(address: string): Observable<object> {
    const api = TRADE_API.URL + TRADE_API.ADD_TO_WATCHLIST.replace('{address}', address);
    return this.post(api);
  }

  public removeFromWatchlist(address: string): Observable<object> {
    const api = TRADE_API.URL + TRADE_API.REMOVE_FROM_WATCHLIST.replace('{address}', address);
    return this.post(api);
  }
}
