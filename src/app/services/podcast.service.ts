import { Injectable } from '@angular/core';
import { PodcastRepositoryService } from './repository/podcast-repository/podcast-repository.service';
import { Podcast } from './repository/podcast-repository/models/podcast.model';
import { Observable, of, tap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PodcastService {

  userPodcast: Podcast[] = [];
  constructor(private readonly podcastRepository: PodcastRepositoryService) { }

  getPodcasts(refresh: boolean = false): Observable<Podcast[]> {
    if(!refresh && this.userPodcast.length > 0) {
      return of(this.userPodcast);
    }

    return this.podcastRepository.getUserPodcasts().pipe(tap((data: Podcast[]) => {
      this.userPodcast = data;
    }));
  }

}
