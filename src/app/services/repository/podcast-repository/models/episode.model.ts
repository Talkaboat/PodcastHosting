import { Podcast } from "./podcast.model";

export interface Episode {
  episodeId: number;
  podcastId: number;
  link?: string;
  audio: string;
  image: string;
  title: string;
  shortDescription?: string;
  podcast?: Podcast;
  thumbnail?: string;
  transcript?: string;
  description: string;
  pubDateInMilliseconds?: number;
  guid_from_rss?: string;
  listennotes_url?: string;
  audioLengthInSeconds: number;
  explicit_content?: boolean;
  maybe_audio_invalid?: boolean;
  listennotes_edit_url?: string;
  playTime?: number;
  isLoading?: boolean;
}
