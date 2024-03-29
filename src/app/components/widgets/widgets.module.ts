import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackNavigationComponent } from './back-navigation/back-navigation.component';
import { PipeModule } from '../../pipes/pipe.module';
import { MatIconModule } from '@angular/material/icon';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { AudioUploaderComponent } from './audio-uploader/audio-uploader.component';
import { BrowserModule } from '@angular/platform-browser';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgStreamingModule } from '@videogular/ngx-videogular/streaming';
import { RecentTradeListComponent } from './recent-trade-list/recent-trade-list.component';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { WalletBalanceComponent } from './wallet-balance/wallet-balance.component';
import { TraderPerformanceWidgetComponent } from './trader-performance-widget/trader-performance-widget.component';

const materialModules = [
  MatCardModule,
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatProgressBarModule,
  MatListModule,
  MatIconModule,
  MatTableModule
];

@NgModule({
  declarations: [
    BackNavigationComponent,
    ImageUploaderComponent,
    AudioUploaderComponent,
    RecentTradeListComponent,
    WalletBalanceComponent,
    TraderPerformanceWidgetComponent
  ],
  imports: [
    CommonModule,
    PipeModule,
    ...materialModules,
    VgCoreModule,
    VgControlsModule,
    VgBufferingModule,
    VgOverlayPlayModule,
    RouterModule

  ],
  exports: [
    BackNavigationComponent,
    ImageUploaderComponent,
    AudioUploaderComponent,
    RecentTradeListComponent,
    WalletBalanceComponent,
    TraderPerformanceWidgetComponent
  ]
})
export class WidgetsModule { }
