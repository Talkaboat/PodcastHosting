import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { RepositoryService } from '../repository.service';
import { Episode } from './models/episode.model';
import { Genre } from './models/genre.model.dto';
import { PlaylistTrack } from './models/playlist/playlist-track.model.dto';
import { Playlist } from './models/playlist/playlist.model.dto';
import { PodcastSearchResponse } from './models/podcast-search-response.model';
import { PodcastSearch } from './models/podcast-search.model';
import { Podcast } from './models/podcast.model';
import { PODCAST_API } from './podcast-urls.const';

@Injectable({
  providedIn: 'root'
})
export class PodcastRepositoryService extends RepositoryService {


  public getEpisode(id: string): Observable<Episode> {
    const api = PODCAST_API.URL + PODCAST_API.EPISODE_DETAILS.replace("{id}", id);
    return this.post(api, null);
  }

  public getEpisodes(podcastId: string, sort = "desc", amount = -1, offset = 0,): Observable<Episode[]> {
    const api = PODCAST_API.URL + PODCAST_API.PODCAST_EPISODES;
    return this.post(api, { id: podcastId, amount, offset, sort});
  }

  public getPodcast(id: any, sort = "desc", offset = 0, amount = 10): Observable<Podcast> {
    const api = PODCAST_API.URL + PODCAST_API.PODCAST_DETAILS;
    return this.post(api, { id, amount, offset, sort});
  }

  getGenres() : Observable<Genre[]> {
    const api = PODCAST_API.URL + PODCAST_API.GENRES_URL;
    return this.get(api);
  }

  getUserPodcasts(): Observable<Podcast[]> {
    const api = PODCAST_API.URL + PODCAST_API.SEARCH_URL + PODCAST_API.CREATOR_PODCASTS;
    return this.get(api);
  }
}
