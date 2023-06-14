import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { TokenModel } from 'src/app/services/repository/token-repository/models/token.dto';
import { WalletModel } from 'src/app/services/repository/wallet-repository/models/wallet.dto';
import { WalletRepositoryService } from 'src/app/services/repository/wallet-repository/wallet-repository.service';

@Component({
  selector: 'app-wallet-balance',
  templateUrl: './wallet-balance.component.html',
  styleUrls: ['./wallet-balance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletBalanceComponent implements OnInit {
  @Input() walletAddress: string = '';
  error: string = '';
  wallet?: WalletModel;
  activeToken: TokenModel | undefined;
  constructor(private readonly walletRepository: WalletRepositoryService, private readonly ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    if(this.walletAddress) {
      this.walletRepository.getWalletBalances(this.walletAddress).subscribe({
        next: (response: WalletModel) => {
          this.wallet = response;
          this.ref.detectChanges();
        },
        error: (response: HttpErrorResponse) => {
          if(response.status == 500) {
            this.error = 'wallet_not_found_exception';
            this.ref.detectChanges();
          }
        },
      });
    } else {
      this.error = 'no_address_found_error';
      this.ref.detectChanges();
    }
  }

  toggleFavorite(token: TokenModel) {

  }

  toggleActiveToken(token: TokenModel) {
    if(this.activeToken === token) {
      this.activeToken = undefined;
    } else {
      this.activeToken = token;
    }
    this.ref.detectChanges();
  }

}
