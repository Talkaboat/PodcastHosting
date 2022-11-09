export interface UpdateEpisodeDto {
  title: string;
  description: string;
  website?: string;
  shortDescription?: string;
  explicitContent: boolean;
  podcastId: number;
  episodeId: number;
}
