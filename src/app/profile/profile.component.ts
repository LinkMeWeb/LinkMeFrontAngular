import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../shared/model/user.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap, take, tap} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';
import {ModalEditProfileComponent} from '../shared/modal-edit-profile/modal-edit-profile.component';
import {ModalPhotoComponent} from '../shared/modal-photo/modal-photo.component';
import {Photo} from "../shared/model/photo.interface";
import {EventService} from "../services/event.service";

@Component({
  selector: 'app-profile',
  styleUrls: ['./profile.component.css'],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  nickname: string;
  user: User;
  owner = false;
  bsModalRef?: BsModalRef;
  title = "Editar Perfil"
  photos: Photo[];
  follows: number;
  followers: number;
  isFollowing = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private modalService: BsModalService,
    private eventService: EventService,
    private router: Router
  ) {
    this.nickname = this.route.snapshot.params['nickname'];
    this.eventService.photosUpdated.subscribe(() => {
      if (!this.nickname) {
        this.findOwnerUser()
        return;
      }
      this.router.navigate(['/profile']);
    })
  }

  ngOnInit() {
    if (this.nickname) {
      this.findByNickname()
      this.retrievePhotosUser();
      return;
    }
    this.findOwnerUser();
    this.owner = true;
  }

  retrievePhotosUser() {
    this.userService.getUserPhotos(this.nickname).pipe(take(1))
      .subscribe((res: Photo[]) => {
        this.photos = res
      })
  }

  findByNickname() {
    this.userService.findByNickname(this.nickname).pipe(take(1),
      tap(res => this.user = res),
      switchMap(() => this.userService.getFollows(this.user.id).pipe(
        tap((data: any) => this.follows = data.follows)
      )),
      switchMap(() => this.userService.getFollowers(this.user.id).pipe(
        tap((data: any) => this.followers = data.followers)
      )),
      switchMap(() => this.userService.checkFollowing(this.user.id).pipe(
        tap((data: any) => this.isFollowing = data)
      ))
    ).subscribe()
  }

  openModalWithComponent() {
    const initialState: ModalOptions = {
      class: 'modal-dialog-centered modal-lg',
      initialState: {
        title: this.title,
        id: this.user.id
      }
    };
    this.bsModalRef = this.modalService.show(ModalEditProfileComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.onHidden.subscribe(() => {
      if (this.bsModalRef.content.save === true) {
        this.findOwnerUser();
      }
    })
  }

  follow() {
    this.userService.follow(this.user.id).pipe(take(1),
      switchMap(() => this.userService.getFollowers(this.user.id).pipe(
        tap((data: any) => this.followers = data.followers)
      )),
      switchMap(() => this.userService.checkFollowing(this.user.id).pipe(
        tap((data: any) => this.isFollowing = data)
      ))
    )
      .subscribe()
  }

  findOwnerUser() {
    this.authService.getOwnUser().pipe(take(1),
      tap(res => this.user = res.data),
      switchMap(() => this.userService.getUserPhotos(this.user.nickname).pipe(take(1),
        tap((data: any) => this.photos = data)
      )),
      switchMap(() => this.userService.getFollows(this.user.id).pipe(take(1),
        tap((data: any) => this.follows = data.follows)
      )),
      switchMap(() => this.userService.getFollowers(this.user.id).pipe(
        tap((data: any) => this.followers = data.followers)
      )),
    ).subscribe()
  }

  openPhotoModal(photoId: number) {
    const initialState: ModalOptions = {
      class: 'modal-dialog-centered modal-xl',
      initialState: {
        title: this.title,
        user: this.user,
        isOwner: this.owner,
        photoId: photoId
      }
    };
    this.bsModalRef = this.modalService.show(ModalPhotoComponent, initialState);
    this.bsModalRef.onHidden.subscribe(() => {
      if (this.bsModalRef.content.save) {
        this.findOwnerUser();
      }
    })
  }

}
