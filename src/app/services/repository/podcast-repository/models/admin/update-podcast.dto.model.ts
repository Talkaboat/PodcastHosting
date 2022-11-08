export interface UpdatePodcastDto {
  podcastId: number;
  title: string;
  description: string;
  genres: number[];
  shortDescription: string;
  country: string;
  language: string;
  website: string;
  author: string;
}
