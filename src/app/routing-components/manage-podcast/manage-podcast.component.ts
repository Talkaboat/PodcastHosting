import { Component, OnInit } from '@angular/core';
import { PodcastService } from 'src/app/services/podcast/podcast.service';
import { Podcast } from 'src/app/services/repository/podcast-repository/models/podcast.model';
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
    this.podcastService.getPodcasts().subscribe(podcasts => {
      this.podcasts = podcasts;
    });
  }

}
