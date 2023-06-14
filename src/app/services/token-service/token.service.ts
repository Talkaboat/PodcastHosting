import { Injectable } from '@angular/core';
import { TokenRepositoryService } from '../repository/token-repository/token-repository.service';
import { TokenModel } from '../repository/token-repository/models/token.dto';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokens: TokenModel[] = [];
  constructor(private readonly tokenRepository: TokenRepositoryService) { }

  public refreshTokenlist() {
    this.tokenRepository.getTokenlist().subscribe(response => {
      this.tokens = response;
    });
  }

  public async mapAddressToToken(address: string, chainId: number): Promise<TokenModel | undefined> {
    let possibileTokens = this.tokens.filter(token => token.address == address && token.chainId == chainId);
    if(!possibileTokens || possibileTokens.length == 0) {
     return await this.addToken(address, chainId);
    }
    return possibileTokens[0];
  }

  public async addToken(address: string, chainId: number): Promise<TokenModel | undefined>  {
    var response = await lastValueFrom(this.tokenRepository.addToken(address, chainId));
    if(response) {
      this.tokens.push(response);
      return response;
    }
    return undefined;
  }
}
