import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, take } from 'rxjs';
import { TranslateService } from 'src/app/services/i18n/translate.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { EpisodeService } from 'src/app/services/episode/episode.service';
import { CreateEpisodeDto } from 'src/app/services/repository/podcast-repository/models/admin/create-episode.dto.model';
import { Episode } from 'src/app/services/repository/podcast-repository/models/episode.model';
import { PodcastRepositoryService } from '../../services/repository/podcast-repository/podcast-repository.service';

@Component({
  selector: 'app-create-episode',
  templateUrl: './create-episode.component.html',
  styleUrls: ['./create-episode.component.scss']
})
export class CreateEpisodeComponent implements OnInit {

  subscriptions: Subscription[] = [];
  uploadStep = 0;
  uploadSub?: Subscription;
  uploadProgress: number = 0;
  episode: CreateEpisodeDto = {
    title: '',
    description: '',
    podcastId: -1
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
        this.episode.podcastId = id;;
      })
    );
  }

  createEpisode() {
    console.log(this.modalForm.invalid);
    console.log(this.selectedEpisode ? true : false);
    console.log(this.selectedImage ? true : false);
    if (this.modalForm.invalid || !this.selectedImage || !this.selectedEpisode) {
      this.toastr.warning(this.translate.transform('creationFormInvalid'));
      return;
    }
    this.loader.show();
    console.log(this.episode);
    this.uploadStep = 1;
    this.episodeService.createEpisode(this.episode).subscribe({
      next: (createdEpisode: Episode) => {
        this.uploadStep++;
        this.podcastRepository.uploadEpisodeImage(createdEpisode.podcastId, createdEpisode.episodeId, this.selectedImage!).subscribe({ next: (event: any) => {
          if (event.type == HttpEventType.UploadProgress && event.total) {
            this.uploadProgress = Math.round(100 * (event.loaded / event.total));
          }
        }, error: (response: HttpErrorResponse) => {
          this.handleError(response);

      this.router.navigate(["/manage", createdEpisode.podcastId, 'episode', createdEpisode.episodeId]);
        }, complete: () => {
          this.uploadEpisode(createdEpisode);
        }});
      }, error: (response: HttpErrorResponse) => this.handleError(response)
    });
  }

  uploadEpisode(createdEpisode: Episode) {
    this.uploadStep++;
    this.podcastRepository.uploadEpisode(createdEpisode.podcastId, createdEpisode.episodeId, this.selectedEpisode!).subscribe({ next: (event: any) => {
      if (event.type == HttpEventType.UploadProgress && event.total) {
        this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        if(this.uploadProgress == 100) {
          this.toastr.success(this.translate.transform('successfullyCreatedEpisode'))
          this.reset();
          this.loader.hide();
          this.router.navigate(["/manage", createdEpisode.podcastId, 'episode', createdEpisode.episodeId]);
        }
      }
    }, error: (response: HttpErrorResponse) => {
      this.handleError(response);
      this.router.navigate(["/manage", createdEpisode.podcastId, 'episode', createdEpisode.episodeId]);
    }, complete: () => {

    }});
  }

  onImageSelected(file: File) {
    this.selectedImage = file;
  }

  onEpisodeSelected(file: File) {
    this.selectedEpisode = file;
    console.log(this.selectedEpisode);
    console.log(this.selectedEpisode ? true: false);
  }

  handleError(response: HttpErrorResponse) {
    this.loader.hide();
    this.toastr.error(this.translate.transform(response.error.message));
  }

  cancelUpload() {
    this.uploadSub?.unsubscribe();
    this.reset();
  }

  resetEpisode() {
    this.episode = {
      title: '',
      description: '',
      podcastId: this.episode.podcastId
    };
  }

  reset() {
    this.uploadProgress = 0;
    this.uploadStep = 0;
    this.uploadSub = undefined;
  }

}
