import { Injectable } from '@angular/core';
import { RepositoryService } from '../repository.service';
import { Observable } from 'rxjs';
import { TOKEN_API } from './token-urls.const';
import { TokenModel } from './models/token.dto';

@Injectable({
  providedIn: 'root'
})
export class TokenRepositoryService extends RepositoryService{

  public addToken(address: string, chainId: number): Observable<TokenModel> {
    const api = TOKEN_API.URL + TOKEN_API.ADD_TOKEN.replace('{address}', address).replace('{chainId}', chainId.toString());
    return this.post(api);
  }

  public getTokenlist(): Observable<TokenModel[]> {
    const api = TOKEN_API.URL;
    return this.get(api);
  }
}
