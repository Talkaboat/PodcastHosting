import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateEpisodeRoutingModule } from './create-episode-routing.module';
import { CreateEpisodeComponent } from './create-episode.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { WidgetsModule } from 'src/app/components/widgets/widgets.module';
import { PipeModule } from 'src/app/pipes/pipe.module';
import {MatSliderModule} from '@angular/material/slider';


@NgModule({
  declarations: [
    CreateEpisodeComponent
  ],
  imports: [
    CommonModule,
    CreateEpisodeRoutingModule,
    WidgetsModule,
    PipeModule,
    ReactiveFormsModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatSliderModule,
    FormsModule
  ]
})
export class CreateEpisodeModule { }
