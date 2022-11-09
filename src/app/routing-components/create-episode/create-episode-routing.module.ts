import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEpisodeComponent } from './create-episode.component';

const routes: Routes = [{ path: '', component: CreateEpisodeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateEpisodeRoutingModule { }
