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



@NgModule({
  declarations: [
    EditPodcastComponent
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
    PipeModule
  ]
})
export class EditPodcastModule { }
