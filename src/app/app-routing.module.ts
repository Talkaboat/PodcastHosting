import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  {
    path: 'sign-in',
    loadChildren: () =>
      import('./routing-components/signin/signin.module').then(
        (m) => m.SigninModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./routing-components/home/home.module').then((m) => m.HomeModule),
    canActivate: [AuthGuard],
  },
  { path: 'create', loadChildren: () => import('./routing-components/create-podcast/create-podcast.module').then(m => m.CreatePodcastModule) },
  { path: 'manage', loadChildren: () => import('./routing-components/manage-podcast/manage-podcast.module').then(m => m.ManagePodcastModule) },
  { path: 'manage/:id', loadChildren: () => import('./routing-components/edit-podcast/edit-podcast.module').then(m => m.EditPodcastModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
