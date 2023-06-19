import { Component } from '@angular/core';
import {Photo} from "../shared/model/photo.interface";
import {User} from "../shared/model/user.interface";
import {PhotoService} from "../services/photo.service";
import {AppComponent} from "../app.component";
import {UserService} from "../services/user.service";
import {EventService} from "../services/event.service";
import {take, zip} from "rxjs";

@Component({
  selector: 'app-liked-photos',
  templateUrl: './liked-photos.component.html',
  styleUrls: ['./liked-photos.component.css']
})
export class LikedPhotosComponent {

  photos: Photo[];
  users: Map<number, User> = new Map<number, User>;

  constructor(
    private photoService: PhotoService,
    private appComponent: AppComponent,
    private userService: UserService,
    private eventService: EventService
  ) {
    this.eventService.photosUpdated.subscribe(() => {
      this.ngOnInit()
    })
  }

  ngOnInit(): void {
    zip(
      this.userService.getLikedPhotos(),
      this.userService.getAll()
    ).pipe(take(1))
      .subscribe(([photos, users]) => {
        this.photos = photos
        this.users = new Map(users.map(user => [user.id, user]));
      })
  }

}
