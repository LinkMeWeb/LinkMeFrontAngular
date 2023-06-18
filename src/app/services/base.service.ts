import { HttpHeaders } from '@angular/common/http';
import {PhotoService} from "./photo.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor() {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  };

  getBase() {
    return this.httpOptions
  }

  updateAuthorizationHeader(token: string) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  protected clearAuthorizationHeader() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }
}
