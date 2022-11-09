import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditEpisodeRoutingModule } from './edit-episode-routing.module';
import { EditEpisodeComponent } from './edit-episode.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { WidgetsModule } from 'src/app/components/widgets/widgets.module';
import { PipeModule } from 'src/app/pipes/pipe.module';

@NgModule({
  declarations: [
    EditEpisodeComponent
  ],
  imports: [
    CommonModule,
    EditEpisodeRoutingModule,
    WidgetsModule,
    PipeModule,
    ReactiveFormsModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatSliderModule,
    FormsModule,

  ]
})
export class EditEpisodeModule { }
