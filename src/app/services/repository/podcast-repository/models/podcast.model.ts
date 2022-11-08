import { Episode } from "./episode.model";
import { PodcastExtras } from "./podcast-extras.model";

export interface Podcast {
  podcastId: number;
  image: string;
  intro?: string;
  shortDescription?: string;
  genre_ids: number[];
  thumbnail?: string;
  publisher_original?: string;
  publisher?: string;
  email?: string;
  type?: string;
  rss?: string;
  episodes?: Episode[];
  title?: string;
  country?: string;
  website?: string;
  language?: string;
  itunes_id?: number;
  description?: string;
  explicit_content?: boolean;
  isLoading?: boolean;
}
