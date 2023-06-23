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
  _walletAddress: string = '';
  get walletAddress(): string {
    return this._walletAddress;
  }
  @Input() set walletAddress(value: string) {
    this._walletAddress = value;
    this.selectedTokens = [];
    this.currentOffset = 0;
    this.refreshWalletBalance();
  }
  error: string = '';
  wallet?: WalletModel;
  currentOffset = 0;
  total = 0;
  amountPerPage = 6;
  selectedTokens: any[] = [];
  activeToken: TokenModel | undefined;
  constructor(private readonly walletRepository: WalletRepositoryService, private readonly ref: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  refreshWalletBalance() {
    if(this.walletAddress) {
      this.walletRepository.getWalletBalances(this.walletAddress).subscribe({
        next: (response: WalletModel) => {
          this.wallet = response;
          this.total = response.tokens.length;
          this.getSelection();
        },
        error: (response: HttpErrorResponse) => {
          if(response.status == 500) {
            this.error = 'wallet_process_error';
            this.ref.detectChanges();
          }
        },
      });
    } else {
      this.error = 'no_address_found_error';
      this.ref.detectChanges();
    }
  }

  nextPage() {
    if(!this.wallet || !this.wallet!.tokens || this.wallet.tokens.length <= this.currentOffset + this.amountPerPage) return;
    this.currentOffset = this.currentOffset + this.amountPerPage;
    this.getSelection();
  }

  previousPage() {
    if(!this.wallet || !this.wallet!.tokens || this.currentOffset <= 0) return;
    this.currentOffset = Math.max(0, this.currentOffset - this.amountPerPage);
    this.getSelection();
  }

  getSelection() {
    if(!this.wallet || !this.wallet!.tokens || this.wallet.tokens.length <= this.currentOffset) return;
    for(var i = this.currentOffset; i < this.currentOffset + this.amountPerPage; i++) {
      if(this.currentOffset == 0 && i >= this.wallet.tokens.length) {
        continue;
      }
      else if(this.currentOffset != 0 && i >= this.wallet.tokens.length) {
        this.selectedTokens.pop();
        continue;
      }
      this.selectedTokens[i - this.currentOffset] = this.wallet?.tokens[i];
    }
    this.ref.detectChanges();
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
