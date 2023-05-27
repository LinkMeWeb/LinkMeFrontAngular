import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../shared/model/login';
import { Observable, catchError, throwError } from 'rxjs';
import { ResponseLogin } from '../shared/model/response-login';
import { User } from '../shared/model/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private apiURL = 'http://localhost/api/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  }

  login(form: Login):Observable<ResponseLogin> {
    return this.httpClient.post(this.apiURL + 'login', form).
    pipe(
      catchError(this.errorHandler)
    );
  }

  logout() {
    return this.httpClient.get(this.apiURL + 'logout', this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getOwnUser(): Observable<any> {
    return this.httpClient.get<any>(this.apiURL + 'user-profile', this.httpOptions)
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
