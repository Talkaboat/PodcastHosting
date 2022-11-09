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
import { UpdatePodcastDto } from './models/admin/update-podcast.dto.model';
import { MEDIA_API } from './media-urls.const';
import { CreatePodcastDto } from './models/admin/create-podcast.dto.model';
import { CreateEpisodeDto } from './models/admin/create-episode.dto.model';
import { UpdateEpisodeDto } from './models/admin/update-episode.dto.model';

@Injectable({
  providedIn: 'root',
})
export class PodcastRepositoryService extends RepositoryService {

  public createEpisode(episode: CreateEpisodeDto): Observable<Episode> {
    const api = PODCAST_API.URL + PODCAST_API.ADMIN_URL + PODCAST_API.CREATE_EPISODE;
    return this.post(api, episode);
  }

  public deleteEpisode(podcastId: number, episodeId: number) {
    const api =
      PODCAST_API.URL +
      PODCAST_API.ADMIN_URL +
      PODCAST_API.DELETE_EPISODE.replace(
        '{podcastId}',
        podcastId.toString()
      ).replace('{episodeId}', episodeId.toString());

      return this.delete(api);
  }

  public getEpisode(id: string): Observable<Episode> {
    const api =
      PODCAST_API.URL + PODCAST_API.EPISODE_DETAILS.replace('{id}', id);
    return this.post(api, null);
  }

  public updateEpisode(episode: UpdateEpisodeDto): Observable<Episode> {
    const api = PODCAST_API.URL + PODCAST_API.ADMIN_URL + PODCAST_API.UPDATE_EPISODE;
    return this.put(api, episode);
  }

  public getEpisodes(
    podcastId: string,
    sort = 'desc',
    amount = -1,
    offset = 0
  ): Observable<Episode[]> {
    const api = PODCAST_API.URL + PODCAST_API.PODCAST_EPISODES;
    return this.post(api, { id: podcastId, amount, offset, sort });
  }

  public getPodcast(
    id: any,
    sort = 'desc',
    offset = 0,
    amount = 10
  ): Observable<Podcast> {
    const api = PODCAST_API.URL + PODCAST_API.PODCAST_DETAILS;
    return this.post(api, { id, amount, offset, sort });
  }

  public deletePodcast(podcastId: any): Observable<Podcast> {
    const api = PODCAST_API.URL + PODCAST_API.ADMIN_URL + PODCAST_API.DELETE_PODCAST.replace('{podcastId}', podcastId);
    return this.delete(api);
  }

  getGenres(): Observable<Genre[]> {
    const api = PODCAST_API.URL + PODCAST_API.GENRES_URL;
    return this.get(api);
  }

  getUserPodcasts(): Observable<Podcast[]> {
    const api =
      PODCAST_API.URL + PODCAST_API.SEARCH_URL + PODCAST_API.CREATOR_PODCASTS;
    return this.get(api);
  }

  createPodcast(podcast: CreatePodcastDto): Observable<Podcast> {
    const api =
      PODCAST_API.URL + PODCAST_API.ADMIN_URL + PODCAST_API.CREATE_PODCAST;
    return this.post(api, podcast);
  }

  updatePodcast(updateData: UpdatePodcastDto): Observable<Podcast> {
    const api =
      PODCAST_API.URL + PODCAST_API.ADMIN_URL + PODCAST_API.UPDATE_PODCAST;
    return this.put(api, updateData);
  }

  uploadPodcastImage(podcastId: number, image: File) {
    const api =
      MEDIA_API.URL +
      MEDIA_API.UPLOAD_PODCAST_IMAGE.replace(
        '{podcastId}',
        podcastId.toString()
      );
    return this.upload(api, image);
  }

  uploadEpisode(podcastId: number, episodeId: number, audio: File) {
    const api =
    MEDIA_API.URL +
    MEDIA_API.UPLOAD_EPISODE.replace(
      '{podcastId}',
      podcastId.toString()
    ).replace(
      '{episodeId}',
      episodeId.toString()
    );
  return this.upload(api, audio);
  }

  uploadEpisodeImage(podcastId: number, episodeId: number, image: File) {
    const api =
      MEDIA_API.URL +
      MEDIA_API.UPLOAD_EPISODE_IMAGE.replace(
        '{podcastId}',
        podcastId.toString()
      ).replace(
        '{episodeId}',
        episodeId.toString()
      );
    return this.upload(api, image);
  }
}
