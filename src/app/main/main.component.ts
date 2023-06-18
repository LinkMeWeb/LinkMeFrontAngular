import {Component, OnInit} from '@angular/core';
import {PhotoService} from '../services/photo.service';
import {Photo} from '../shared/model/photo.interface';
import {AppComponent} from '../app.component';
import {UserService} from "../services/user.service";
import {take, zip} from "rxjs";
import {User} from "../shared/model/user.interface";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  photos: Photo[];
  users: Map<number, User> = new Map<number, User>;

  constructor(
    private photoService: PhotoService,
    private appComponent: AppComponent,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    zip(
      this.photoService.getAll(),
      this.userService.getAll()
    ).pipe(take(1))
      .subscribe(([photos, users]) => {
        this.photos = photos
        this.users = new Map(users.map(user => [user.id, user]));
      })
  }


}
