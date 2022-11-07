import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackNavigationComponent } from './back-navigation/back-navigation.component';
import { PipeModule } from '../../pipes/pipe.module';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    BackNavigationComponent
  ],
  imports: [
    CommonModule,
    PipeModule,
    MatIconModule
  ],
  exports: [
    BackNavigationComponent
  ]
})
export class WidgetsModule { }
