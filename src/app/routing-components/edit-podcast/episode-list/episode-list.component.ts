import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { EpisodeService } from 'src/app/services/episode/episode.service';
import { Episode } from 'src/app/services/repository/podcast-repository/models/episode.model';
import { LoaderService } from '../../../services/loader/loader.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-episode-list',
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EpisodeListComponent implements OnInit {
  displayedColumns: string[] = ['image', 'title', 'pubDateInMilliseconds', 'actions'];
  _podcastId: number = -1;
  episodes: Episode[] = [];
  dataSource: MatTableDataSource<Episode> = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  @Input() set podcastId(id: number) {
    this._podcastId = id;
    this.getEpisodes();
  }
  constructor(
    private readonly episodeService: EpisodeService,
    private readonly loader: LoaderService,
    private readonly ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
  }

  getEpisodes(refresh: boolean = false) {
    this.loader.show();
    this.episodeService.getEpisodes(this._podcastId, refresh).subscribe({
      next: (response: Episode[]) => {
        this.episodes = response;
        this.dataSource = new MatTableDataSource(this.episodes);
        this.dataSource!.sort = this.sort!;
        this.dataSource!.paginator = this.paginator!;
        this.ref.markForCheck();
        this.loader.hide();
      },
      error: (error: HttpErrorResponse) => {
        this.loader.hide();
      },
    });
  }
  applyFilter(event: any) {
    if (!this.dataSource || !event) return;
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createNewEpisode() {

  }

  deleteEpisode(episode: Episode) {
    const sub = this.episodeService.onEpisodeDeleted.subscribe(_ => {
      sub.unsubscribe();
      this.getEpisodes();
    })
    this.episodeService.deleteEpisode(episode);
  }
}
