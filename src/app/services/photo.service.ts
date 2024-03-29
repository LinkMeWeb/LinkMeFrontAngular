import {Injectable} from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import {Photo} from '../shared/model/photo.interface';
import {HttpClient} from '@angular/common/http';
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class PhotoService extends BaseService {

  constructor(
    private httpClient: HttpClient,
  ) {
    super()
  }

  private apiURL = 'http://localhost/api/photo/';

  getAll(): Observable<Photo[]> {
    return this.httpClient.get<Photo[]>(this.apiURL, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  create(photo: any): Observable<Photo> {
    return this.httpClient.post<Photo>(this.apiURL, JSON.stringify(photo), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  find(id: number): Observable<Photo> {
    return this.httpClient.get<Photo>(this.apiURL + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  update(user: Photo): Observable<Photo> {
    return this.httpClient.put<Photo>(this.apiURL + user.id, JSON.stringify(user), this.httpOptions)
      .pipe(catchError(this.errorHandler)
      )
  }

  delete(id: number) {
    return this.httpClient.delete(this.apiURL + id, this.httpOptions)
      .pipe(catchError(this.errorHandler)
      );
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
