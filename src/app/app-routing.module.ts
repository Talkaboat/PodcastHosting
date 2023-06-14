import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'sign-in',
    loadChildren: () =>
      import('./routing-components/signin/signin.module').then(
        (m) => m.SigninModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./routing-components/home/home.module').then((m) => m.HomeModule),
    //canActivate: [AuthGuard],
  },
  {
    path: 'wallet/:address',
    loadChildren: () =>
      import('./routing-components/wallet-watcher/wallet-watcher.module').then(
        (m) => m.WalletWatcherModule
      ),
    //canActivate: [AuthGuard],
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./routing-components/create-podcast/create-podcast.module').then(
        (m) => m.CreatePodcastModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'manage',
    loadChildren: () =>
      import('./routing-components/manage-podcast/manage-podcast.module').then(
        (m) => m.ManagePodcastModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'manage/:id',
    loadChildren: () =>
      import('./routing-components/edit-podcast/edit-podcast.module').then(
        (m) => m.EditPodcastModule
      ),
    canActivate: [AuthGuard],
  },

  { path: 'create/:id/episode', loadChildren: () => import('./routing-components/create-episode/create-episode.module').then(m => m.CreateEpisodeModule) },
  { path: 'manage/:id/episode/:episodeId', loadChildren: () => import('./routing-components/edit-episode/edit-episode.module').then(m => m.EditEpisodeModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
