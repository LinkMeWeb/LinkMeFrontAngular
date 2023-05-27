import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../shared/model/user.interface';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalEditProfileComponent } from '../shared/modal-edit-profile/modal-edit-profile.component';
import { PhotoModelComponent } from '../shared/photo-model/photo-model.component';
import { ModalPhotoComponent } from '../shared/modal-photo/modal-photo.component';

@Component({
  selector: 'app-profile',
  styleUrls: ['./profile.component.css'],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  nickname: string;
  user: User;
  owner: boolean = false;
  bsModalRef?: BsModalRef;
  title: string = "Editar Perfil"

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private modalService: BsModalService
  ) {
    this.nickname = this.route.snapshot.params['nickname'];
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

  ngOnInit() {
    if (this.nickname) {
      this.findByNickname();
      return;
    }
    this.findOwnerUser();
    this.owner = true;
  }

  findByNickname() {
    this.userService.findByNickname(this.nickname)
    .subscribe(data => this.user = data)
  }

  findOwnerUser() {
    this.authService.getOwnUser().pipe(take(1))
    .subscribe(res => this.user = res.data)
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
