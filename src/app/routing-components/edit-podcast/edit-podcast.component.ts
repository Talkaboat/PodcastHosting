import { Component, OnInit, OnDestroy, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { PodcastService } from '../../services/podcast.service';
import { Podcast } from '../../services/repository/podcast-repository/models/podcast.model';
import { FormBuilder, Validators } from '@angular/forms';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';

@Component({
  selector: 'app-edit-podcast',
  templateUrl: './edit-podcast.component.html',
  styleUrls: ['./edit-podcast.component.scss']
})
export class EditPodcastComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  podcast: Podcast = { podcastId: -1, image: '', genre_ids: []};

  @ViewChild('titleTextArea') titleArea: CdkTextareaAutosize | undefined;
  @ViewChild('descriptionTextArea') descriptionArea: CdkTextareaAutosize | undefined;
  @ViewChild('shortDescriptionTextArea') shortDescriptionArea: CdkTextareaAutosize | undefined;

  modalForm = this.formBuilder.group({
    title: [this.podcast.title, [Validators.required, Validators.maxLength(120), Validators.minLength(4)]],
    description: [this.podcast.description, [Validators.required]],
    genres: [this.podcast.genre_ids, [Validators.required]],
    author: [this.podcast.publisher],
    language: [this.podcast.language],
    country: [this.podcast.country],
    shortDescription: [this.podcast.shortDescription, [Validators.maxLength(157)]],
    website: [this.podcast.website]
  });

  constructor(private readonly route: ActivatedRoute, private readonly podcastService: PodcastService, private readonly formBuilder: FormBuilder, private readonly _ngZone: NgZone) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    if(this.titleArea && this.descriptionArea && this.shortDescriptionArea) {
      this._ngZone.onStable.pipe(take(1)).subscribe(() => {
        this.titleArea!.resizeToFitContent(true);
        this.descriptionArea!.resizeToFitContent(true);
        this.shortDescriptionArea!.resizeToFitContent(true);
      });
    }
  }

  ngOnInit(): void {
    this.subscriptions.push(this.route.params.subscribe(params => {
      const id = +params['id'];
      this.podcastService.getPodcast(id).subscribe((podcast: Podcast) => {
        this.podcast = podcast;
      });
    }));
  }

}
