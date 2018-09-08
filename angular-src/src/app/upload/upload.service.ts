import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UploadService {
  private api = environment.api + "upload";

  constructor(private http: HttpClient) { }

  uploadFile(route: string, file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append("uploadedFile", file, file.name);
    formData.append("route", route);

    return this.http.post<any>(this.api + '/file', formData).pipe(
      map(res => {
        return res.data as string;
      })
    );
  }

  editFile(route: string, file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append("uploadedFile", file, file.name);
    formData.append("route", route);
    return this.http.post<any>(this.api + '/file', formData).pipe(
      map(res => {
        return res.data as string;
      })
    );
  }

  deleteFile(filePath: string) {
    const params: HttpParams = new HttpParams();
    params.append("filePath", filePath);
    return this.http.delete<any>(this.api, { params }).pipe(
      map(res => {
        return res.data as string;
      })
    );
  }

  // uploadFile(route: string, fileName: string, file: File): Observable<any> {
  //   // const status = {};
  //   const formData: FormData = new FormData();
  //   formData.append("image", file, fileName);
  //   formData.append("route", route);
  //   // create a http-post request and pass the form
  //   // tell it to report the upload progress
  //   const req = new HttpRequest("POST", this.api, formData, {
  //     // reportProgress: true,
  //   });

  //   // create a new progress-subject for every file
  //   // const progress = new Subject<number>();

  //   // send the http-request and subscribe for progress-updates
  //   // this.http.request(req).subscribe(event => {
  //   //   if (event.type === HttpEventType.UploadProgress) {
  //   //     // calculate the progress percentage
  //   //     const percentDone = Math.round(100 * event.loaded / event.total);

  //   //     // pass the percentage into the progress-stream
  //   //     progress.next(percentDone);
  //   //   } else if (event instanceof HttpResponse) {
  //   //     // Close the progress-stream if we get an answer form the API
  //   //     // The upload is complete
  //   //     progress.complete();
  //   //   }
  //   // });
  //   // status[file.name] = {
  //   //   progress: progress.asObservable()
  //   // };
  //   // return status;
  //   return this.http.request(req);
  // }
}
