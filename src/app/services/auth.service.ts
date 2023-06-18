import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Login} from '../shared/model/login';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {ResponseLogin} from '../shared/model/response-login';
import {BaseService} from "./base.service";
import {UserService} from "./user.service";
import {PhotoService} from "./photo.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor(
    private httpClient: HttpClient,
    private photoService: PhotoService,
    private userService: UserService
  ) {
    super()
  }

  private apiURL = 'http://localhost/api/';

  login(form: Login): Observable<ResponseLogin> {
    return this.httpClient.post<ResponseLogin>(this.apiURL + 'login', form).pipe(
      tap((res) => {
        const token = res.token;
        localStorage.setItem('token', token);
        this.updateAuthorizationHeader(token)
        this.photoService.updateAuthorizationHeader(token)
        this.userService.updateAuthorizationHeader(token)
      }),
      catchError(this.errorHandler)
    );
  }

  logout() {
    return this.httpClient.get(this.apiURL + 'logout', this.httpOptions).pipe(
      tap(() => {
        localStorage.removeItem('token');
        this.clearAuthorizationHeader();
      }),
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
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
