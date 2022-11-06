import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RepositoryService } from '../repository.service';
import { ResponseModel } from './models/response.model';
import { RewardDetail } from './models/reward-detail.model';
import { Reward } from './models/reward.model';
import { UserData } from './models/user-data.model';
import { USER_API } from './user-urls.const';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService extends RepositoryService {
  public getRewards(): Observable<Reward> {
    const api = USER_API.URL + USER_API.REWARD_URL;
    return this.get(api);
  }

  public getRewardDetails(): Observable<RewardDetail[]> {
    const api = USER_API.URL + USER_API.REWARD_DETAILS_URL;
    return this.get(api);
  }

  getUser(): Observable<UserData> {
    const api = USER_API.URL + USER_API.PROFILE_URL;
    return this.get<UserData>(api);
  }
}
