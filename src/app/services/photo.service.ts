import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Photo } from '../shared/model/photo.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  private apiURL = 'http://localhost/api/photo/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getAll(): Observable<Photo[]> {
    return this.httpClient.get<Photo[]>(this.apiURL)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  create(photo: Photo): Observable<Photo> {
    return this.httpClient.post<Photo>(this.apiURL, JSON.stringify(photo), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  find(id: number): Observable<Photo> {
    return this.httpClient.get<Photo>(this.apiURL + id)
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

  like(id: number) {
    return this.httpClient.post(this.apiURL + id + '/like', null, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
