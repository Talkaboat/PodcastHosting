import { Injectable, EventEmitter } from '@angular/core';
import { PodcastRepositoryService } from '../repository/podcast-repository/podcast-repository.service';
import { Episode } from '../repository/podcast-repository/models/episode.model';
import { Observable, of, tap } from 'rxjs';
import { WebsiteStateService } from '../website-state/website-state.service';
import { ModalState } from 'src/app/components/default/modal/models/modal-state.model';
import { LoaderService } from '../loader/loader.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '../i18n/translate.service';
import { ToastrService } from 'ngx-toastr';
import { CreateEpisodeDto } from '../repository/podcast-repository/models/admin/create-episode.dto.model';
import { UpdateEpisodeDto } from '../repository/podcast-repository/models/admin/update-episode.dto.model';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  currentPodcast: number = -1;
  podcastEpisodes: Episode[] = [];
  onEpisodeDeleted: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private readonly podcastRepository: PodcastRepositoryService,
    private readonly websiteState: WebsiteStateService,
    private readonly loader: LoaderService,
    private readonly translate: TranslateService,
    private readonly toastr: ToastrService
  ) {}

  getEpisode(episodeId: number, refresh: boolean = false) {
    const episode = this.podcastEpisodes.length > 0
    ? this.podcastEpisodes.filter(entry => entry.episodeId === episodeId)[0] : undefined;
    if(!refresh && episode) {
      return of(episode);
    }

    return this.podcastRepository.getEpisode(episodeId.toString()).pipe(tap((episode: Episode) => {
      if(this.currentPodcast === -1 || this.currentPodcast === episode.podcastId) {
        this.podcastEpisodes.push(episode);
      }
    }));
  }

  getEpisodes(
    podcastId: number,
    refresh: boolean = false
  ): Observable<Episode[]> {
    if (
      !refresh &&
      this.podcastEpisodes.length > 0 &&
      this.currentPodcast !== -1
      && this.currentPodcast === podcastId
    ) {
      return of(this.podcastEpisodes);
    }

    return this.podcastRepository.getEpisodes(podcastId.toString()).pipe(
      tap((episodes: Episode[]) => {
        this.currentPodcast = podcastId;
        this.podcastEpisodes = episodes;
      })
    );
  }

  editEpisode(episode: Episode): Observable<Episode> {
    const data: UpdateEpisodeDto = {
      title: episode.title,
      description: episode.description,
      shortDescription: episode.shortDescription,
      website: episode.link,
      explicitContent: episode.explicit_content ?? false,
      podcastId: episode.podcastId,
      episodeId: episode.episodeId
    }
    return this.podcastRepository.updateEpisode(data).pipe(tap((createdEpisode: Episode) => {
      if(this.currentPodcast === episode.podcastId) {
        this.podcastEpisodes = this.podcastEpisodes.filter(entry => entry.episodeId != episode.episodeId);
        this.podcastEpisodes.push(createdEpisode);
        this.podcastEpisodes = this.podcastEpisodes.sort();
      }
    }));
  }

  createEpisode(episode: CreateEpisodeDto): Observable<Episode> {
    return this.podcastRepository.createEpisode(episode).pipe(tap((createdEpisode: Episode) => {
      if(this.currentPodcast === episode.podcastId) {
        this.podcastEpisodes.push(createdEpisode);
      }
    }));
  }

  deleteEpisode(episode: Episode) {
    this.websiteState.modalState = this.getConfirmationModal(episode);
    this.websiteState.onLoginModalStateChanged.emit(true);
  }

  getConfirmationModal(episode: Episode): ModalState {
    return {
      title: 'confirmEpisodeDelete',
      subtitle: this.translate.transform('confirmEpisodeDeleteSubtitle', [
        episode.title,
      ]),
      placeholder: 'episodeName',
      useTextField: true,
      onSubmit: (episodeName: any) => {
        if (episodeName !== episode.title) {
          this.toastr.warning(
            this.translate.transform('episodeDeletionNameMismatch')
          );
          return;
        }
        this.loader.show();
        this.podcastRepository
          .deleteEpisode(episode.podcastId, episode.episodeId)
          .subscribe({
            next: (deletedEpisode: Episode) => {
              this.podcastEpisodes = this.podcastEpisodes.filter(
                (entry) => entry.episodeId !== deletedEpisode.episodeId
              );
              this.onEpisodeDeleted.emit(true);
              this.loader.hide();
              this.websiteState.onLoginModalStateChanged.emit(false);
            },
            error: (response: HttpErrorResponse) => {
              this.loader.hide();
            },
          });
      },
      onClose: () => {},
    };
  }
}
