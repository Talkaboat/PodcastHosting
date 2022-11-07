import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPodcastComponent } from './edit-podcast.component';

const routes: Routes = [{ path: '', component: EditPodcastComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditPodcastRoutingModule { }
