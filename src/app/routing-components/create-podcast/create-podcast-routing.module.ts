import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePodcastComponent } from './create-podcast.component';

const routes: Routes = [{ path: '', component: CreatePodcastComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatePodcastRoutingModule { }
