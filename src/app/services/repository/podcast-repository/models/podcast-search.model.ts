export interface PodcastSearch {
    searchTerm: any;
    sortByDate?: number;
    type?: any;
    offset?: number;
    minLength?: number;
    maxLength?: number;
    minEpisodes?: number;
    maxEpisodes?: number;
    genres?: any;
    publishedBefore?: number;
    amount?: number;
    searchOnlyIn?: any;
    language?: any;
    region?: any;
    withPodcastIds?: any;
    withoutPodcastIds?: any;
    safeMode?: number;
}