import { Podcast } from "./podcast.model";

export interface PodcastSearchResult {
    aboat_id: number;
    id: string;
    rss: string;
    link?: string;
    audio?: string;
    image: string;
    podcast?: Podcast;
    itunes_id?: number;
    thumbnail?: string;
    pub_date_ms: any;
    title_original: string;
    listennotes_url?: string;
    audio_length_sec: number;
    explicit_content?: boolean;
    title_highlighted: string;
    description_original: string;
    description_highlighted?: string;
  transcripts_highlighted?: any[];
  isLoading?:boolean;
}
