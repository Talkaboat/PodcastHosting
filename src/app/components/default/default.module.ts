import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingComponent } from './loading/loading.component';
import { LoadingAnimationComponent } from './loading/loading-animation/loading-animation.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    LoadingAnimationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoadingComponent
  ]
})
export class DefaultModule { }
