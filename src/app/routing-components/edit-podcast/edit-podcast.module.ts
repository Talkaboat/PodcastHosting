import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditPodcastRoutingModule } from './edit-podcast-routing.module';
import { EditPodcastComponent } from './edit-podcast.component';
import { WidgetsModule } from '../../components/widgets/widgets.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    EditPodcastComponent
  ],
  imports: [
    CommonModule,
    EditPodcastRoutingModule,
    WidgetsModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class EditPodcastModule { }
