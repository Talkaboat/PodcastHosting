import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditPodcastRoutingModule } from './edit-podcast-routing.module';
import { EditPodcastComponent } from './edit-podcast.component';
import { WidgetsModule } from '../../components/widgets/widgets.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { PipeModule } from '../../pipes/pipe.module';
import { MatOptionModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { EpisodeListComponent } from './episode-list/episode-list.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { RouterModule } from '@angular/router';
import { PodcastStatisticComponent } from './podcast-statistic/podcast-statistic.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule }from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    EditPodcastComponent,
    EpisodeListComponent,
    PodcastStatisticComponent
  ],
  imports: [
    CommonModule,
    EditPodcastRoutingModule,
    WidgetsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    PipeModule,
    RouterModule,
    NgxChartsModule
  ]
})
export class EditPodcastModule { }
