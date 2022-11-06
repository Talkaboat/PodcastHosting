import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '../../services/i18n/translate.service';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform, OnDestroy {

  private shouldTransform = true;
  private changedLanguage: Subscription = new Subscription();
  private value: string = '';

  constructor(private readonly translate: TranslateService) {
    this.changedLanguage = translate.onUpdateLanguage.subscribe(val => {
      this.shouldTransform = true;
    });
  }
  ngOnDestroy(): void {
    this.changedLanguage.unsubscribe();
  }

  transform(value: string, ...args: []): string {
    if (!this.shouldTransform) {
      return this.value;
    }
    this.value = this.translate.transform(value, args || {});
    this.shouldTransform = false;
    return this.value;
  }



}
