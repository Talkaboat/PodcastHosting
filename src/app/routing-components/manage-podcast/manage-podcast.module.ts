import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { ManagePodcastRoutingModule } from './manage-podcast-routing.module';
import { ManagePodcastComponent } from './manage-podcast.component';
import {MatListModule} from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { PipeModule } from '../../pipes/pipe.module';
import { WidgetsModule } from '../../components/widgets/widgets.module';


@NgModule({
  declarations: [
    ManagePodcastComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    ManagePodcastRoutingModule,
    RouterModule,
    PipeModule,
    WidgetsModule
  ]
})
export class ManagePodcastModule { }
