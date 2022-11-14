import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { PodcastService } from '../../../services/podcast/podcast.service';
import { StatisticService } from '../../../services/statistic/statistic.service';
import {
  AggregationTime,
  PodcastStatistic,
} from '../../../services/repository/statistic-repository/models/podcast-statistic.model.dto';

@Component({
  selector: 'app-podcast-statistic',
  templateUrl: './podcast-statistic.component.html',
  styleUrls: ['./podcast-statistic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PodcastStatisticComponent implements OnInit {
  @Input() podcastId: number = 0;
  days: number = 30;
  aggregation: AggregationTime = AggregationTime.Daily;
  statistic?: PodcastStatistic;
  data: any = [];
  aggregations: any = [];
  xAxisLabel = '';
  yAxisLabel = '';
  colorScheme = {
    bar: [
      '#FF8A80',
      '#EA80FC',
      '#8C9EFF',
      '#80D8FF',
      '#A7FFEB',
      '#CCFF90',
      '#FFFF8D',
      '#FF9E80',
    ],
    domain: [
      '#FF8A80',
      '#EA80FC',
      '#8C9EFF',
      '#80D8FF',
      '#A7FFEB',
      '#CCFF90',
      '#FFFF8D',
      '#FF9E80',
    ],
  };
  constructor(
    private readonly statisticService: StatisticService,
    private readonly ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAggregationTimes();
    this.statisticService
      .getPodcastStatistic(this.podcastId, this.days, this.aggregation)
      .subscribe({
        next: (response: PodcastStatistic) => {
          this.statistic = response;
          this.generateListeningData();
          this.ref.markForCheck();
        },
      });
  }

  // generateListeningData() {
  //   if(this.statistic) {

  //     const allStats = this.statistic.episodeStatistics.map(data => data.stats.map(stat => {
  //       const name = stat.fromDate;//stat.fromDate === stat.toDate ? stat.fromDate : `${stat.fromDate} - ${stat.toDate}`;
  //       return { name, value: stat.totalListeningTimeInMilliseconds / 1000 / 60 }})).flatMap(i => i);
  //     console.log(allStats);
  //     for (const stat in allStats) {
  //       this.data.push(stat);
  //     }
  //     this.data = allStats.filter((stat, i, arr) => arr.findIndex(t => t.name === stat.name) === i);
  //   }
  // }

  getAggregationTimes() {
    for (var name in AggregationTime) {
      if (isNaN(Number(name))) {
        this.aggregations.push({ name, value: (<any>AggregationTime)[name]});
      }
    }
  }

  changeAggregationTime() {
    this.statisticService
      .getPodcastStatistic(this.podcastId, this.days, this.aggregation, true)
      .subscribe({
        next: (response: PodcastStatistic) => {
          this.statistic = response;
          console.log(this.statistic);
          this.generateListeningData();
          this.ref.markForCheck();
        },
      });
  }

  generateListeningData() {
    if (this.statistic) {
      const distinctDates = this.statistic.episodeStatistics
        .map((data) => data.stats)
        .flatMap((i) => i);
      const temporaryData = new Map<string, number>();
      let options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'numeric',
        year: '2-digit',
      };
      distinctDates.forEach((item) => {
        const listeningTime = item.totalListeningTimeInMilliseconds / 1000;
        const fromName = new Date(item.fromDate).toLocaleDateString(
          'en-US',
          options
        );
        let name = fromName;
        if(item.fromDate !== item.toDate) {
          const toName = new Date(item.toDate).toLocaleDateString(
            'en-US',
            options
          );
          name = `${name.substring(0, name.lastIndexOf("/"))} - ${toName}`;
        }
        if (temporaryData.has(name)) {
          temporaryData.set(name, temporaryData.get(name)! + listeningTime);
        } else {
          temporaryData.set(name, listeningTime);
        }
      });
      const data: any = [];
      temporaryData.forEach((value, key) => {
        data.push({ name: key, value });
      });
      this.data = data;
      this.xAxisLabel = 'date';
      this.yAxisLabel = 'totalSeconds';
    }
  }
}
