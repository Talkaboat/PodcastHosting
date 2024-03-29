import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { CreatePodcastDto } from '../repository/podcast-repository/models/admin/create-podcast.dto.model';
import { Genre } from '../repository/podcast-repository/models/genre.model.dto';
import { Podcast } from '../repository/podcast-repository/models/podcast.model';
import { PodcastRepositoryService } from '../repository/podcast-repository/podcast-repository.service';

@Injectable({
  providedIn: 'root'
})
export class PodcastService {
  userPodcast: Podcast[] = [];
  genres: Genre[] = [];
  constructor(private readonly podcastRepository: PodcastRepositoryService) { }

  getPodcasts(): Observable<Podcast[]> {
    return this.podcastRepository.getUserPodcasts().pipe(tap((data: Podcast[]) => {
      this.userPodcast = data;
    }));
  }

  getPodcast(id: number, refresh: boolean = false): Observable<Podcast> {
    var results = this.userPodcast.filter(podcast => podcast.podcastId === id);
    if(!refresh && results && results.length >= 1) {
      return of(results[0]);
    }
    return this.podcastRepository.getPodcast(id).pipe(tap((podcast: Podcast) => {
      this.userPodcast = this.userPodcast.filter(entry => entry.podcastId != podcast.podcastId);
      this.userPodcast.push(podcast);
    }));
  }

  deletePodcast(podcast: Podcast): Observable<Podcast> {
    return this.podcastRepository.deletePodcast(podcast.podcastId)
    .pipe(tap((deletedPodcast: Podcast) => {
      this.userPodcast = this.userPodcast.filter(entry => entry.podcastId != deletedPodcast.podcastId);
    }));
  }

  getGenres(refresh: boolean = false) {
    if(!refresh && this.genres && this.genres.length > 0) {
      return of(this.genres);
    }

    return this.podcastRepository.getGenres().pipe(tap((genres: Genre[]) => {
      this.genres = genres;
    }));
  }

  createPodcast(podcast: CreatePodcastDto): Observable<Podcast> {
    return this.podcastRepository.createPodcast(podcast).pipe(tap((createdPodcast: Podcast) => {
      this.userPodcast.push(createdPodcast);
      console.log(createdPodcast);
    }));
  }

  updatePodcast(podcast: Podcast): Observable<Podcast> {
    const genreIds = podcast.genreModels?.map((genre: Genre) => genre.id);
    return this.podcastRepository.updatePodcast({
      podcastId: podcast.podcastId,
      title: podcast.title ?? '',
      description: podcast.description ?? '',
      shortDescription: podcast.shortDescription ?? '',
      language: podcast.language ?? '',
      country: podcast.country ?? '',
      genres: genreIds ?? [],
      website: podcast.website ?? '',
      author: podcast.publisher ?? ''
    }).pipe(tap((response: Podcast) => {
      this.userPodcast = this.userPodcast.filter(entry => entry.podcastId != podcast.podcastId);
      this.userPodcast.push(response);
    }))
  }


}
