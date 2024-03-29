import { Component, OnInit, OnDestroy, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { Podcast } from '../../services/repository/podcast-repository/models/podcast.model';
import { FormBuilder, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Genre } from '../../services/repository/podcast-repository/models/genre.model.dto';
import { PodcastRepositoryService } from '../../services/repository/podcast-repository/podcast-repository.service';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { LoaderService } from '../../services/loader/loader.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '../../services/i18n/translate.service';
import { PodcastService } from 'src/app/services/podcast/podcast.service';
import { WebsiteStateService } from '../../services/website-state/website-state.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-podcast',
  templateUrl: './edit-podcast.component.html',
  styleUrls: ['./edit-podcast.component.scss'],
})
export class EditPodcastComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  uploadSub?: Subscription;
  uploadProgress: number = 0;
  changedImage: boolean = false;
  podcast: Podcast = { podcastId: -1, image: '', genres: '' };
  selectedImage?: File;
  genreList: Genre[] = [];
  preview: string = '';

  @ViewChild('titleTextArea') titleArea: CdkTextareaAutosize | undefined;
  @ViewChild('descriptionTextArea') descriptionArea:
    | CdkTextareaAutosize
    | undefined;
  @ViewChild('shortDescriptionTextArea') shortDescriptionArea:
    | CdkTextareaAutosize
    | undefined;
  modalForm = this.formBuilder.group({
    title: [
      this.podcast.title,
      [Validators.required, Validators.maxLength(120), Validators.minLength(4)],
    ],


    description: [this.podcast.description, [Validators.required]],
    genres: [this.podcast.genres, [Validators.required]],
    author: [this.podcast.publisher],
    language: [this.podcast.language],
    country: [this.podcast.country],
    shortDescription: [
      this.podcast.shortDescription,
      [Validators.maxLength(157)],
    ],
    website: [this.podcast.website],
  });

  constructor(
    private readonly route: ActivatedRoute,
    private readonly podcastService: PodcastService,
    private readonly formBuilder: FormBuilder,
    private readonly _ngZone: NgZone,
    private readonly podcastRepository: PodcastRepositoryService,
    private readonly loader: LoaderService,
    private readonly toastr: ToastrService,
    private readonly translate: TranslateService,
    private readonly router: Router,
    private readonly websiteState: WebsiteStateService, private readonly titleService: Title
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  triggerResize() {
    this.modalForm.get('genres');
    // Wait for changes to be applied, then trigger textarea resize.
    if (this.titleArea && this.descriptionArea && this.shortDescriptionArea) {
      this._ngZone.onStable.pipe(take(1)).subscribe(() => {
        this.titleArea!.resizeToFitContent(true);
        this.descriptionArea!.resizeToFitContent(true);
        this.shortDescriptionArea!.resizeToFitContent(true);
      });
    }
  }

  ngOnInit(): void {
    this.titleService.setTitle('Talkaboat Hosting - Manage')
    this.podcastService.getGenres().subscribe((genres: Genre[]) => {
      this.genreList = genres;
      this.fillGenreModels();
    });
    this.subscriptions.push(
      this.route.params.subscribe((params) => {
        const id = +params['id'];
        this.podcastService.getPodcast(id).subscribe((podcast: Podcast) => {
          this.titleService.setTitle('Talkaboat Hosting - Manage ' + podcast.title);
          this.podcast = podcast;
          this.preview = this.podcast.image;
          this.fillGenreModels();
        });
      })
    );
  }

  public objectComparisonFunction = function (
    option: Genre,
    value: Genre
  ): boolean {
    return option.id === value.id;
  };

  fillGenreModels() {
    if (this.genreList && this.podcast.podcastId != -1) {
      this.podcast.genreModels = [];
      this.genreList.forEach((genre: Genre) => {
        if (this.podcast.genres.includes(genre.name)) {
          this.podcast.genreModels?.push(genre);
        }
      });
    }
  }

  onImageSelected(file: File) {
    this.selectedImage = file;
    this.changedImage = true;
    this.preview = '';
  }

  refreshPodcast() {
    this.podcastService
      .getPodcast(this.podcast.podcastId, true)
      .subscribe((podcast: Podcast) => {
        this.podcast = podcast;
        this.titleService.setTitle('Talkaboat Hosting - Manage ' + podcast.title);
        this.fillGenreModels();
        this.selectedImage = undefined;
        this.changedImage = false;
        this.preview = this.podcast.image;
      });
  }

  updatePodcast() {
    if(this.modalForm.invalid) {
      this.toastr.warning(this.translate.transform('creationFormInvalid'));
      return;
    }
    this.loader.show();
    if(this.changedImage && this.selectedImage) {
      this.podcastRepository.uploadPodcastImage(this.podcast.podcastId, this.selectedImage).subscribe({ next: event => {
        if (event.type == HttpEventType.UploadProgress && event.total) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        }
      }, error: (response: HttpErrorResponse) => {
        this.handleError(response);
      }, complete: () => {
        this.executeUpdate();
      }});
    } else {
      this.executeUpdate();
    }

  }

  executeUpdate() {
    this.podcastService.updatePodcast(this.podcast).subscribe({
      next: (response: Podcast) => {
        this.podcast = response;
        this.titleService.setTitle('Talkaboat Hosting - Manage ' + this.podcast.title);
        this.toastr.success(this.translate.transform('podcastUpdateSuccess'));
        this.fillGenreModels();
        this.loader.hide();
      },
      error: (response: HttpErrorResponse) => {
        this.handleError(response);
      }
    });
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
    this.uploadSub = undefined;
  }

  deletePodcast() {
    this.websiteState.modalState = this.getDeletionModalState();
    this.websiteState.openModal();
    console.log("Delete");
  }

  getDeletionModalState() {
    return {
      title: 'confirmPodcastDelete',
      subtitle: this.translate.transform('confirmPodcastDeleteSubtitle', [
        this.podcast.title!,
      ]),
      placeholder: 'Podcast',
      useTextField: true,
      onSubmit: (podcastTitle: any) => {
        if (podcastTitle !== this.podcast.title) {
          this.toastr.warning(
            this.translate.transform('podcastDeletionNameMismatch')
          );
          return;
        }
        this.loader.show();
        this.podcastService.deletePodcast(this.podcast).subscribe({
          next: (_: any) => {
            this.router.navigate(['/manage']);
            this.loader.hide();
          }, error: (response: HttpErrorResponse) => {
            this.handleError(response);
          }
        });
      },
      onClose: () => {},
    };
  }
}
