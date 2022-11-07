import { Podcast } from "./podcast.model";

export interface Episode {
  episodeId: number;
  podcastId: number;
  id: string;
  link?: string;
  audio: string;
  image: string;
  title: string;
  podcast: Podcast;
  thumbnail?: string;
  transcript?: string;
  description: string;
  pub_date_ms?: number;
  guid_from_rss?: string;
  listennotes_url?: string;
  audio_length_sec: number;
  explicit_content?: boolean;
  maybe_audio_invalid?: boolean;
  listennotes_edit_url?: string;
  playTime?: number;
  isLoading?: boolean;
}
