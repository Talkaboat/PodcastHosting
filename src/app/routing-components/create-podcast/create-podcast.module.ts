import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatePodcastRoutingModule } from './create-podcast-routing.module';
import { CreatePodcastComponent } from './create-podcast.component';
import { WidgetsModule } from '../../components/widgets/widgets.module';
import { PipeModule } from '../../pipes/pipe.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    CreatePodcastComponent
  ],
  imports: [
    CommonModule,
    CreatePodcastRoutingModule,
    WidgetsModule,
    PipeModule,
    ReactiveFormsModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class CreatePodcastModule { }
