import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, take } from 'rxjs';
import { EpisodeService } from 'src/app/services/episode/episode.service';
import { TranslateService } from 'src/app/services/i18n/translate.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { Episode } from 'src/app/services/repository/podcast-repository/models/episode.model';
import { PodcastRepositoryService } from 'src/app/services/repository/podcast-repository/podcast-repository.service';

@Component({
  selector: 'app-edit-episode',
  templateUrl: './edit-episode.component.html',
  styleUrls: ['./edit-episode.component.scss']
})
export class EditEpisodeComponent implements OnInit {

  subscriptions: Subscription[] = [];
  uploadStep = 0;
  changedImage = false;
  changedAudio = false;
  uploadSub?: Subscription;
  uploadProgress: number = 0;
  duration: number = 0;
  episode: Episode = {
    title: '',
    description: '',
    podcastId: -1,
    episodeId: -1,
    image: '',
    audio: '',
    audioLengthInSeconds: 0
  };
  selectedImage?: File;
  selectedEpisode?: File;

  @ViewChild('titleTextArea') titleArea: CdkTextareaAutosize | undefined;
  @ViewChild('descriptionTextArea') descriptionArea:
    | CdkTextareaAutosize
    | undefined;

  modalForm = this.formBuilder.group({
    title: [
      this.episode.title,
      [Validators.required, Validators.maxLength(120), Validators.minLength(4)],
    ],
    description: [this.episode.description, [Validators.required]],
  });

  constructor(
    private readonly episodeService: EpisodeService,
    private readonly formBuilder: FormBuilder,
    private readonly _ngZone: NgZone,
    private readonly podcastRepository: PodcastRepositoryService,
    private readonly loader: LoaderService,
    private readonly toastr: ToastrService,
    private readonly translate: TranslateService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  triggerResize() {
    this.modalForm.get('genres');
    // Wait for changes to be applied, then trigger textarea resize.
    if (this.titleArea && this.descriptionArea) {
      this._ngZone.onStable.pipe(take(1)).subscribe(() => {
        this.titleArea!.resizeToFitContent(true);
        this.descriptionArea!.resizeToFitContent(true);
      });
    }
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.params.subscribe((params) => {
        const id = +params['id'];
        const episodeId = +params['episodeId'];
        this.getEpisode(episodeId);
      })
    );
  }

  receiveDuration(duration: number) {
    this.episode.audioLengthInSeconds = duration;
    this.duration = duration;
  }

  getEpisode(episodeId: number, refresh: boolean = false) {
    this.episodeService.getEpisode(episodeId, refresh).subscribe({
      next: (episode: Episode) => {
        console.log(episode);
        this.episode = episode;
      }
    })
  }

  editEpisode() {
    if (this.modalForm.invalid) {
      this.toastr.warning(this.translate.transform('creationFormInvalid'));
      return;
    }
    this.loader.show();
    console.log(this.episode);
    this.uploadStep = 1;
    this.episodeService.editEpisode(this.episode).subscribe({
      next: (updatedEpisode: Episode) => {
        this.episode = updatedEpisode;
        this.uploadStep++;
        this.uploadImage();
      }, error: (response: HttpErrorResponse) => this.handleError(response)
    });
  }

  uploadImage() {
    if(!this.changedImage) {
      this.uploadEpisode();
      return;
    }
    this.podcastRepository.uploadEpisodeImage(this.episode.podcastId, this.episode.episodeId, this.selectedImage!).subscribe({ next: (event: any) => {
      if (event.type == HttpEventType.UploadProgress && event.total) {
        this.uploadProgress = Math.round(100 * (event.loaded / event.total));
      }
    }, error: (response: HttpErrorResponse) => {
      this.handleError(response);
    }, complete: () => {
      this.uploadEpisode();
    }});
  }

  uploadEpisode() {
    this.uploadStep++;
    if(!this.changedAudio) {
      this.reset();
      this.loader.hide();
      this.completedUpdate();
      return;
    }
    this.podcastRepository.uploadEpisode(this.episode.podcastId, this.episode.episodeId, this.selectedEpisode!, this.duration).subscribe({ next: (event: any) => {
      if (event.type == HttpEventType.UploadProgress && event.total) {
        this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        if(this.uploadProgress == 100) {
          this.completedUpdate();
        }
      }
    }, error: (response: HttpErrorResponse) => {
      this.handleError(response);
    }, complete: () => {

    }});
  }

  completedUpdate() {
    this.toastr.success(this.translate.transform('successfullyUpdatedEpisode'))
    this.reset();
    this.loader.hide();
  }

  onImageSelected(file: File) {
    this.selectedImage = file;
    this.changedImage = true;
  }

  onEpisodeSelected(file: File) {
    this.selectedEpisode = file;
    this.changedAudio = true;
  }

  handleError(response: HttpErrorResponse) {
    this.loader.hide();
    this.toastr.error(this.translate.transform(response.error.message));
  }

  cancelUpload() {
    this.uploadSub?.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = 0;
    this.uploadStep = 0;
    this.uploadSub = undefined;
  }

}
