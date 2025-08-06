import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor() {}

  UploadFile(file: File, type: number, data: any): Observable<any> {
    return new Observable((observer) => {
      // Code to upload the file using the UploadFileService
      // and return the response

      observer.next({
        FileMimeType: 'image/jpeg',
        FileSize: 123,
        FileUrl: 'https://example.com/file.jpg',
      });

      observer.complete();
    });
  }
}
