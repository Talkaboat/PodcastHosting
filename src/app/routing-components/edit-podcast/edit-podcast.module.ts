import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditPodcastRoutingModule } from './edit-podcast-routing.module';
import { EditPodcastComponent } from './edit-podcast.component';
import { WidgetsModule } from '../../components/widgets/widgets.module';


@NgModule({
  declarations: [
    EditPodcastComponent
  ],
  imports: [
    CommonModule,
    EditPodcastRoutingModule,
    WidgetsModule
  ]
})
export class EditPodcastModule { }
