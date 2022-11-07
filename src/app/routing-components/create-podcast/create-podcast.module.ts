import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatePodcastRoutingModule } from './create-podcast-routing.module';
import { CreatePodcastComponent } from './create-podcast.component';
import { WidgetsModule } from '../../components/widgets/widgets.module';


@NgModule({
  declarations: [
    CreatePodcastComponent
  ],
  imports: [
    CommonModule,
    CreatePodcastRoutingModule,
    WidgetsModule
  ]
})
export class CreatePodcastModule { }
