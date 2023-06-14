import { Injectable } from '@angular/core';
import { RepositoryService } from '../repository.service';
import { Observable } from 'rxjs';
import { WALLET_API } from './wallet-urls.const';
import { WalletModel } from './models/wallet.dto';

@Injectable({
  providedIn: 'root'
})
export class WalletRepositoryService extends RepositoryService{

  public getWalletBalances(address: string): Observable<WalletModel> {
    const api = WALLET_API.URL + WALLET_API.GET_BALANCES.replace('{address}', address);
    return this.get(api);
  }
}
