import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagePodcastComponent } from './manage-podcast.component';

const routes: Routes = [{ path: '', component: ManagePodcastComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagePodcastRoutingModule { }
