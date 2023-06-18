import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../shared/model/user.interface';
import { UserUpdate } from '../shared/model/user-update';
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService{

  constructor(
    private httpClient: HttpClient
  ) {
    super()
  }

  private apiURL = 'http://localhost/api/user/';
  private apiURLVoid = 'http://localhost/api/';


  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiURLVoid + 'users', this.httpOptions)
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
    return this.httpClient.get<User>(this.apiURL + id, this.httpOptions)
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

  emailExists(email: string): Observable<boolean> {
    return this.httpClient.get<boolean>(this.apiURLVoid + 'checkEmail/' + email, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  nicknameExists(nickname: string): Observable<boolean> {
    return this.httpClient.get<boolean>(this.apiURLVoid + 'checkUser/' + nickname, this.httpOptions)
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

  liked(id: number): Observable<boolean> {
    return this.httpClient.get<boolean>(this.apiURL + 'liked/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getProfileImage(id: number) {
    return this.httpClient.get<Object>(this.apiURLVoid + 'user/profile/image/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getUserPhotos(nickname: string) {
    return this.httpClient.get(this.apiURL + 'images/' + nickname, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  searchUser(nickname: string) {
    return this.httpClient.get(this.apiURLVoid + 'user/search/users/' + nickname, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  follow(id: number) {
    return this.httpClient.post(this.apiURL + 'follow', {id: id}, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getFollows(id: number) {
    return this.httpClient.get(this.apiURL + 'follows/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getFollowers(id: number) {
    return this.httpClient.get(this.apiURL + 'followers/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  checkFollowing(id: number) {
    return this.httpClient.get(this.apiURL + 'checkFollowing/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getComments(id: number) {
    return this.httpClient.get(`${this.apiURLVoid}photos/${id}/comments`, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  comment(photoId: number, comment: string) {
    return this.httpClient.post(`${this.apiURLVoid}photos/${photoId}/comments`, {content: comment}, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )

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
