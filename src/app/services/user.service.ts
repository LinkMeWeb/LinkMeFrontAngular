import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../shared/model/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private apiURL = 'http://localhost/api/user/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  }

  getAll(): Observable<User> {
    return this.httpClient.get<User>(this.apiURL)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  create(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiURL, JSON.stringify(user), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  update(user: User): Observable<User> {
    return this.httpClient.patch<User>(this.apiURL + 'update-profile/' + user.id, JSON.stringify(user), this.httpOptions)
    .pipe(catchError(this.errorHandler)
    )
  }

  find(id: number): Observable<User> {
    return this.httpClient.get<User>(this.apiURL + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  findByNickname(nickname: string): Observable<User> {
    return this.httpClient.get<User>(this.apiURL + 'get-user/' + nickname, this.httpOptions)
    .pipe (
      catchError(this.errorHandler)
    );
  }

  emailExists(email: string): Observable<Boolean> {
    return this.httpClient.get<Boolean>(this.apiURL + 'check-email/' + email, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  delete(id: number) {
    return this.httpClient.delete(this.apiURL + id, this.httpOptions)
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
