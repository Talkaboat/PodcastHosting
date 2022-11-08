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
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const materialModules = [
  MatCardModule,
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatProgressBarModule,
  MatListModule,
  MatIconModule,
];

@NgModule({
  declarations: [
    BackNavigationComponent,
    ImageUploaderComponent
  ],
  imports: [
    CommonModule,
    PipeModule,
    ...materialModules

  ],
  exports: [
    BackNavigationComponent,
    ImageUploaderComponent
  ]
})
export class WidgetsModule { }
