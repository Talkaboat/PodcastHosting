import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription, take } from 'rxjs';
import { TranslateService } from 'src/app/services/i18n/translate.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { PodcastService } from 'src/app/services/podcast/podcast.service';
import { Genre } from 'src/app/services/repository/podcast-repository/models/genre.model.dto';
import { PodcastRepositoryService } from 'src/app/services/repository/podcast-repository/podcast-repository.service';
import { CreatePodcastDto } from '../../services/repository/podcast-repository/models/admin/create-podcast.dto.model';
import { Podcast } from '../../services/repository/podcast-repository/models/podcast.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-podcast',
  templateUrl: './create-podcast.component.html',
  styleUrls: ['./create-podcast.component.scss'],
})
export class CreatePodcastComponent implements OnInit {
  subscriptions: Subscription[] = [];
  uploadSub?: Subscription;
  uploadProgress: number = 0;
  changedImage: boolean = false;
  podcast: CreatePodcastDto = {
    title: '',
    description: '',
    genres: [],
    author: '',
    country: '',
  };
  selectedImage?: File;
  genreList: Genre[] = [];
  selectedGenres: Genre[] = [];

  @ViewChild('titleTextArea') titleArea: CdkTextareaAutosize | undefined;
  @ViewChild('descriptionTextArea') descriptionArea:
    | CdkTextareaAutosize
    | undefined;

  modalForm = this.formBuilder.group({
    title: [
      this.podcast.title,
      [Validators.required, Validators.maxLength(120), Validators.minLength(4)],
    ],
    description: [this.podcast.description, [Validators.required]],
    genres: [this.selectedGenres, [Validators.required]],
    author: [this.podcast.author],
    country: [this.podcast.country],
  });

  constructor(
    private readonly podcastService: PodcastService,
    private readonly formBuilder: FormBuilder,
    private readonly _ngZone: NgZone,
    private readonly podcastRepository: PodcastRepositoryService,
    private readonly loader: LoaderService,
    private readonly toastr: ToastrService,
    private readonly translate: TranslateService,
    private readonly router: Router
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
    this.podcastService.getGenres().subscribe((genres: Genre[]) => {
      this.genreList = genres;
    });
  }

  createPodcast() {
    if (this.modalForm.invalid || !this.selectedImage) {
      this.toastr.warning(this.translate.transform('creationFormInvalid'));
      return;
    }
    this.loader.show();
    this.podcast.genres = this.selectedGenres.map((genre) => genre.id);
    console.log(this.podcast);
    this.podcastService.createPodcast(this.podcast).subscribe({
      next: (createdPodcast: Podcast) => {
        this.podcastRepository.uploadPodcastImage(createdPodcast.podcastId, this.selectedImage!).subscribe({ next: event => {
          if (event.type == HttpEventType.UploadProgress && event.total) {
            this.uploadProgress = Math.round(100 * (event.loaded / event.total));
          }
        }, error: (response: HttpErrorResponse) => {
          this.handleError(response);
        }, complete: () => {
          this.toastr.success(this.translate.transform('successfullyCreatedPodcast'))
          this.loader.hide();
          this.router.navigate(["/manage", createdPodcast.podcastId]);
        }});
      }, error: (response: HttpErrorResponse) => this.handleError(response)
    });
  }

  onImageSelected(file: File) {
    this.selectedImage = file;
    this.changedImage = true;
  }

  handleError(response: HttpErrorResponse) {
    this.loader.hide();
    this.toastr.error(this.translate.transform(response.error.message));
  }

  cancelUpload() {
    this.uploadSub?.unsubscribe();
    this.reset();
  }

  resetPodcast() {
    this.selectedGenres = [];
    this.podcast = {
      title: '',
      description: '',
      genres: [],
      author: '',
      country: '',
    };
  }

  reset() {
    this.uploadProgress = 0;
    this.uploadSub = undefined;
  }
}
