import { Injectable, EventEmitter } from '@angular/core';
import { LoaderState } from './loader';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public onLoadingStateChanged = new EventEmitter<boolean>();

  private isLoading = false;

  constructor() { }

  show() {
    this.isLoading = true;
    this.onLoadingStateChanged.emit(true);
  }

  hide() {
    this.isLoading = false;
    this.onLoadingStateChanged.next(false);
  }
}
