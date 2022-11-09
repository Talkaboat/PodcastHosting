import { Component, EventEmitter, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { WebsiteStateService } from 'src/app/services/website-state/website-state.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  onSubmit: EventEmitter<string> = new EventEmitter<string>();
  onClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  isClosed = false;
  title: string = 'Title';
  subtitle: string = 'Subtitle';
  placeholder: string = 'placeholder';
  useTextField: boolean = true;
  subscriptions: Subscription[] = [];
  private readonly ALPHA_NUMERIC_REGEX = /^[a-zA-Z0-9_]*$/;

  modalForm: FormGroup = this.formBuilder.group({
    modalInput: ['', [Validators.required]],
  });
  constructor(private readonly formBuilder: FormBuilder, private readonly websiteState: WebsiteStateService) { }

  ngOnInit(): void {
    var state = this.websiteState.modalState;
    this.title = state.title;
    this.subtitle = state.subtitle ?? '';
    this.useTextField = state.useTextField ?? false;
    this.placeholder = state.placeholder ?? '';
    this.subscriptions.push(this.onSubmit.subscribe(state.onSubmit));
    this.subscriptions.push(this.onClose.subscribe(state.onClose));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  submit() {
    if (this.modalForm.valid || !this.useTextField) {
      this.onSubmit.emit(this.modalForm.get("modalInput")?.value);
    }
  }

  close() {
    this.websiteState.onLoginModalStateChanged.emit(false);
    this.onClose.emit(false);
  }

  alphaNumericValidator(regEx: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = !regEx.test(control.value);
      return forbidden ? {forbiddenName: {value: control.value}} : null;
    };
  }
}
