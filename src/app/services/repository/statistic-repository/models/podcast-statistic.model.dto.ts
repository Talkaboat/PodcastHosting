export interface PodcastStatistic {
  podcastId: number;
  bookmarks: number;
  episodeStatistics: EpisodeStatistic[];
}

export interface EpisodeStatistic {
  episodeId: number;
  stats: TimeStatistic[];
}

export interface TimeStatistic {
  episodeId: number;
  uniqueListeners: number;
  totalListeningTimeInMilliseconds: number;
  fromDate: Date;
  toDate: Date;
}

export enum AggregationTime {
  Daily = 1,
  Weekly = 7,
  Monthly = 30
}
