import { Episode } from "./episode.model";
import { Genre } from "./genre.model.dto";
import { PodcastExtras } from "./podcast-extras.model";

export interface Podcast {
  podcastId: number;
  image: string;
  intro?: string;
  shortDescription?: string;
  genres: string;
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
  genreModels?: Genre[];
  isLoading?: boolean;
}
