import { Injectable } from '@angular/core';
import { StatisticRepositoryService } from '../repository/statistic-repository/statistic-repository.service';
import { PodcastStatistic, AggregationTime } from '../repository/statistic-repository/models/podcast-statistic.model.dto';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  statistic?: PodcastStatistic;

  constructor(private readonly repository: StatisticRepositoryService) { }

  getPodcastStatistic(podcastId: number, days: number, aggregation: AggregationTime, refresh = false): Observable<PodcastStatistic> {
    if(!refresh && this.statistic && this.statistic.podcastId === podcastId) {
      return of(this.statistic);
    }
    return this.repository.getPodcastStatistic(podcastId, days, aggregation).pipe(tap((response: PodcastStatistic) => {
      this.statistic = response;
    }));
  }
}
