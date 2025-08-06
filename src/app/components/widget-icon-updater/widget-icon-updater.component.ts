import {
  HttpErrorResponse,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-widget-icon-updater',
  templateUrl: './widget-icon-updater.component.html',
  styleUrls: ['./widget-icon-updater.component.css'],
})
export class WidgetIconUpdaterComponent implements OnInit {
  @Input() imageUrl: string = '';
  @Output() imageUrlChange = new EventEmitter<string>();

  defaultImage = 'assets/images/robot.jpg';
  validationError: boolean = false;
  fileError: boolean = false;
  errorMessage: string = '';

  maxFileSize = 5 * 1024 * 1024; // Max file size (5MB)
  minWidth = 511;
  minHeight = 511;

  isUploading = false;

  constructor(private uploadService: UploadService) {}

  ngOnInit(): void {}

  onImageUrlChange(url: string): void {
    if (this.isValidImageUrl(url)) {
      this.imageUrl = url;
      this.imageUrlChange.emit(this.imageUrl);
      this.validationError = false;
    } else {
      this.validationError = true;
    }
  }

  private isValidImageUrl(url: string): boolean {
    const pattern = new RegExp('https?://[^\\s]+\\.(jpg|jpeg|png|gif)', 'i');
    return pattern.test(url);
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileError = false;
      this.errorMessage = '';
      this.isUploading = true;

      this.validateFile(file).subscribe((isValid) => {
        if (!isValid) {
          this.fileError = true;
          this.errorMessage =
            'Invalid file format. Please select a valid image file (jpg, png, gif).';
          this.isUploading = false;
        } else {
          this.uploadImage(file).subscribe((response) => {
            this.isUploading = false;
            if (response) {
              this.imageUrl = response.FilePath;
              this.imageUrlChange.emit(this.imageUrl);
            } else {
              this.fileError = true;
              this.errorMessage = 'Upload failed. Please try again.';
            }
          });
        }
      });
    }
  }

  private validateFile(file: File): Observable<boolean> {
    if (this.isValidImageFile(file) && this.isValidImageSize(file)) {
      return this.isValidImageDimensions(file);
    }
    return of(false);
  }

  private isValidImageFile(file: File): boolean {
    const validFormats = ['image/jpeg', 'image/png', 'image/gif'];
    return validFormats.includes(file.type);
  }

  private isValidImageSize(file: File): boolean {
    return file.size <= this.maxFileSize;
  }

  private isValidImageDimensions(file: File): Observable<boolean> {
    const img = new Image();
    const reader = new FileReader();
    return new Observable<boolean>((observer) => {
      reader.onload = (e: any) => {
        img.onload = () => {
          if (img.width < this.minWidth || img.height < this.minHeight) {
            observer.next(false);
          } else {
            observer.next(true);
          }
          observer.complete();
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  private uploadImage(image: File): Observable<any> {
    return this.uploadService.UploadFile(image, 1, {}).pipe(
      map((res: HttpResponse<any>) => {
        if (res.status === 200 && res.type === HttpEventType.Response) {
          if (res.body && res.body.FileMimeType.includes('image')) {
            return res.body;
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.errorMessage =
          error.error?.message ||
          'Image upload failed. Please try again later.';
        this.fileError = true;
        return of(false);
      })
    );
  }

  get displayedImageUrl(): string {
    return this.imageUrl && !this.validationError
      ? this.imageUrl
      : this.defaultImage;
  }

  resetFileInput(fileInput: HTMLInputElement): void {
    fileInput.value = '';
  }
}
