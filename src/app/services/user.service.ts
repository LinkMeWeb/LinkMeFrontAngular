import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../shared/model/user.interface';
import { UserUpdate } from '../shared/model/user-update';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private apiURL = 'http://localhost/api/user/';
  private apiURLVoid = 'http://localhost/api/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  }

  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiURLVoid + 'users')
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getAllByParams(params) {
    return this.httpClient.post<User[]>(this.apiURLVoid + 'users/params', params, this.httpOptions).
    pipe(
      catchError(this.errorHandler)
    )
  }

  create(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiURLVoid + 'user-create', JSON.stringify(user), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  update(user: User | UserUpdate): Observable<User> {
    return this.httpClient.patch<User>(this.apiURL + 'update-profile', JSON.stringify(user), this.httpOptions)
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

  like(id: number) {
    return this.httpClient.get(this.apiURL + 'like/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  liked(id: number): Observable<Boolean> {
    return this.httpClient.get<Boolean>(this.apiURL + 'liked/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  delete() {
    return this.httpClient.delete(this.apiURL, this.httpOptions)
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
