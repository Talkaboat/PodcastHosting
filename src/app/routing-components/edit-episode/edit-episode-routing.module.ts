import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditEpisodeComponent } from './edit-episode.component';

const routes: Routes = [{ path: '', component: EditEpisodeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditEpisodeRoutingModule { }
