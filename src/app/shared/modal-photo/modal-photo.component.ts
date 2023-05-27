import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserUpdate } from '../model/user-update';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/services/user.service';
import { PhotoService } from 'src/app/services/photo.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-modal-photo',
  templateUrl: './modal-photo.component.html',
  styleUrls: ['./modal-photo.component.css']
})
export class ModalPhotoComponent implements OnInit {

  save = false;
  aboutForm: FormGroup;
  user: UserUpdate
  title: string;
  profileImage: File;
  likes: number = 2000000000;
  userLiked: boolean;
  photoId: number;
  loaded = false;

  constructor(
    public bsModalRef: BsModalRef,
    private userService: UserService,
  ) {

    
  }

  ngOnInit(): void {
    this.userService.liked(this.photoId).pipe(take(1))
    .subscribe(res => {
      this.userLiked = res ? true : false;
      console.log( this.userLiked);
      
      this.loaded = true;
    })
  }

  likeRequest() {
    this.userService.like(this.photoId).pipe(take(1))
    .subscribe((res) => {
      this.userLiked = res ? true : false
      this.userLiked ? this.likes++ : this.likes--;
      console.log(this.likes)
    })
  }

}
