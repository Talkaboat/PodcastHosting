import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletWatcherComponent } from './wallet-watcher.component';

const routes: Routes = [{ path: '', component: WalletWatcherComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletWatcherRoutingModule { }
