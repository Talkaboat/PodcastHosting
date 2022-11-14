import { Injectable } from '@angular/core';
import { RepositoryService } from '../repository.service';
import { AggregationTime, PodcastStatistic } from './models/podcast-statistic.model.dto';
import { Observable } from 'rxjs';
import { STATISTIC_API } from './statistic-urls.const';

@Injectable({
  providedIn: 'root'
})
export class StatisticRepositoryService extends RepositoryService{

  public getPodcastStatistic(podcastId: number, days: number, aggregation: AggregationTime): Observable<PodcastStatistic> {
    const api = STATISTIC_API.URL + STATISTIC_API.PODCAST_STATISTIC
                                    .replace('{podcastId}', podcastId.toString())
                                    .replace('{days}', days.toString())
                                    .replace('{aggregation}', aggregation.toString());
    return this.get(api);
  }
}
