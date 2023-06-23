import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingComponent } from './loading/loading.component';
import { LoadingAnimationComponent } from './loading/loading-animation/loading-animation.component';
import { ModalComponent } from './modal/modal.component';
import { PipeModule } from '../../pipes/pipe.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    LoadingAnimationComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    PipeModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    ModalComponent
  ]
})
export class DefaultModule { }
