import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../shared/model/user.interface';
import {ActivatedRoute} from '@angular/router';
import {switchMap, take, tap} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';
import {ModalEditProfileComponent} from '../shared/modal-edit-profile/modal-edit-profile.component';
import {ModalPhotoComponent} from '../shared/modal-photo/modal-photo.component';
import {Photo} from "../shared/model/photo.interface";

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
  profileImage: any;
  photos: Photo[];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private modalService: BsModalService
  ) {
    this.nickname = this.route.snapshot.params['nickname'];
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
        console.log(this.photos)
      })
  }

  findByNickname() {
    this.userService.findByNickname(this.nickname).pipe(take(1),
      tap(res => this.user = res),
      switchMap(() => this.userService.getProfileImage(this.user.id).pipe(
        tap((data: any) => this.profileImage = 'data:image/jpeg;base64,' + data.imageData)
      ))
    ).subscribe()
  }

  openModalWithComponent() {
    const initialState: ModalOptions = {
      class: 'modal-dialog-centered',
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

  findOwnerUser() {
    this.authService.getOwnUser().pipe(take(1),
      tap(res => this.user = res.data),
      switchMap(() => this.userService.getProfileImage(this.user.id).pipe(
        tap((data: any) => this.profileImage = 'data:image/jpeg;base64,' + data.imageData)
      ))
    ).subscribe()
  }

  openPhotoModal(photoId: number) {
    const initialState: ModalOptions = {
      class: 'modal-dialog-centered modal-xl',
      initialState: {
        title: this.title,
        user: this.user,
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
