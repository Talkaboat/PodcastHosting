import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletWatcherRoutingModule } from './wallet-watcher-routing.module';
import { WalletWatcherComponent } from './wallet-watcher.component';
import { WidgetsModule } from 'src/app/components/widgets/widgets.module';


@NgModule({
  declarations: [
    WalletWatcherComponent
  ],
  imports: [
    CommonModule,
    WalletWatcherRoutingModule,
    WidgetsModule
  ]
})
export class WalletWatcherModule { }
