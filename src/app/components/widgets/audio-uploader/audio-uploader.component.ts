import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { TranslateService } from 'src/app/services/i18n/translate.service';

@Component({
  selector: 'app-audio-uploader',
  templateUrl: './audio-uploader.component.html',
  styleUrls: ['./audio-uploader.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudioUploaderComponent implements OnInit {
  selectedFile?: File;
  selectedFileName: string = '';
  data: any;
  progressInfos: any[] = [];
  message: string[] = [];
  _preview: string = '';
  @Input() set preview(value: string) {
    if(value) {
      if(value.includes('format=m3u8-aapl')) {
       this._preview = `${value}.m3u8`;
       console.log(this._preview);
      } else {
        this._preview = value;
      }
    }
  }
  @Output() onSelectFile: EventEmitter<File> = new EventEmitter<File>();
  imageInfo?: Observable<any>;

  constructor(private readonly translate: TranslateService, private readonly toastr: ToastrService, private readonly ref: ChangeDetectorRef) {}

  ngOnInit(): void {}

  videoPlayerInit(data: any) {
    this.data = data;
  }

  selectFile(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFileName = '';
    this.selectedFile = event.target.files[0];



    if (this.selectedFile) {
      if(this.selectedFile.size >= 1024 * 1024 * 1024 * 1) {
        this.selectedFile = undefined;
        this.toastr.error(this.translate.transform('imageSizeTooLarge'));
        return;
      }
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.preview = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);

      this.selectedFileName = this.selectedFile.name;
      this.onSelectFile.emit(this.selectedFile);
      this.ref.markForCheck();
    }
  }

}
