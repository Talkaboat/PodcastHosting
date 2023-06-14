import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatButtonModule } from '@angular/material/button';
import { PipeModule } from '../../pipes/pipe.module';
import { RouterModule } from '@angular/router';
import { WidgetsModule } from 'src/app/components/widgets/widgets.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    PipeModule,
    RouterModule,
    WidgetsModule
  ]
})
export class HomeModule { }
