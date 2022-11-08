import { Component, OnInit } from '@angular/core';
import { Podcast } from 'src/app/services/repository/podcast-repository/models/podcast.model';
import { PodcastService } from '../../services/podcast.service';

@Component({
  selector: 'app-manage-podcast',
  templateUrl: './manage-podcast.component.html',
  styleUrls: ['./manage-podcast.component.scss']
})
export class ManagePodcastComponent implements OnInit {
  podcasts: Podcast[] = [];

  constructor(private readonly podcastService: PodcastService) { }

  ngOnInit(): void {
    this.podcastService.getPodcasts().subscribe(podcasts => {
      this.podcasts = podcasts;
    });
  }

  refreshPodcasts() {
    this.podcastService.getPodcasts(true).subscribe(podcasts => {
      this.podcasts = podcasts;
    });
  }

}
