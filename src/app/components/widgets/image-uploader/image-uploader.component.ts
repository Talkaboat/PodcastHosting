import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '../../../services/i18n/translate.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
})
export class ImageUploaderComponent implements OnInit {
  selectedFile?: File;
  selectedFileName: string = '';

  progressInfos: any[] = [];
  message: string[] = [];
  _preview: string = '';
  @Input() set preview(value: string) {
    if(value) {
      this._preview = value;
    }
  }
  @Output() onSelectFile: EventEmitter<File> = new EventEmitter<File>();
  imageInfo?: Observable<any>;

  constructor(private readonly translate: TranslateService, private readonly toastr: ToastrService) {}

  ngOnInit(): void {}

  selectFile(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFileName = '';
    this.selectedFile = event.target.files[0];


    if (this.selectedFile) {
      if(this.selectedFile.size >= 1024 * 1024 * 1) {
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
    }
  }
}
