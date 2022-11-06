import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SanitizeUrlPipe } from "./Sanitizers/sanitize-html.pipe";
import { TimePipe } from './time/time.pipe';
import { TranslatePipe } from "./translate/translate.pipe";

@NgModule({
  declarations: [
    TranslatePipe,
    SanitizeUrlPipe,
    TimePipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [TranslatePipe, SanitizeUrlPipe, TimePipe]
})
export class PipeModule { }
