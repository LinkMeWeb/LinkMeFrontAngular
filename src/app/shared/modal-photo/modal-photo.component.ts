import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserUpdate} from '../model/user-update';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {UserService} from 'src/app/services/user.service';
import {PhotoService} from 'src/app/services/photo.service';
import {concatMap, distinct, forkJoin, mergeMap, take, tap} from 'rxjs';
import {Photo} from "../model/photo.interface";
import {User} from "../model/user.interface";
import {Comment} from "../model/comment";
import Swal from "sweetalert2";

@Component({
  selector: 'app-modal-photo',
  templateUrl: './modal-photo.component.html',
  styleUrls: ['./modal-photo.component.css']
})
export class ModalPhotoComponent implements OnInit {

  save = false;
  user: UserUpdate
  title: string;
  userLiked: boolean;
  photoId: number;
  loaded = false;
  photo: Photo
  owner: User
  comments: Comment[]
  userComments: any
  commentForm: FormGroup;
  isOwner: boolean;

  constructor(
    public bsModalRef: BsModalRef,
    private userService: UserService,
    private photoService: PhotoService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required]
    });

    this.findPhoto();
    this.getComments();
    this.getUserLiked();
  }

  submitForm() {
    if (this.commentForm.invalid) {
      this.commentForm.markAllAsTouched();
      return;
    }
    this.userService.comment(this.photo.id, this.commentForm.get('comment').value).pipe(take(1))
      .subscribe(() => this.getComments())
    this.commentForm.reset();
  }

  private getUserLiked() {
    this.userService.liked(this.photoId).pipe(take(1))
      .subscribe(res => {
        this.userLiked = res
        this.loaded = true;
      })
  }

  private getComments() {
    this.userService.getComments(this.photoId).pipe(take(1),
      tap((res: Comment[]) => this.comments = res),
      concatMap((res: Comment[]) => {
        const userObservables = res.map(comment => this.userService.find(comment.user_id));
        return forkJoin(userObservables).pipe(
          distinct()
        )
      }),
    )
      .subscribe(users => {
        this.userComments = new Map(users.map(user => [user.id, user]));
      })
  }

  deletePhoto() {
    if (this.isOwner) {
      this.photoService.delete(this.photoId).pipe(take(1))
        .subscribe(() => {
          this.save = true;
          this.showAlertSuccessful();
          this.bsModalRef.hide()
        })
    }
  }

  private findPhoto() {
    this.photoService.find(this.photoId).pipe(take(1),
      tap(res => this.photo = res),
      mergeMap(() => this.userService.find(this.photo.user_id)),
    )
      .subscribe(res => this.owner = res)
  }

  likeRequest() {
    this.userService.like(this.photoId).pipe(take(1))
      .subscribe((res: boolean) => {
        this.userLiked = res
        this.userLiked ? this.photo.likes++ : this.photo.likes--;
      })
  }

  showAlertSuccessful() {
    Swal.mixin({
      title: "Eliminada con éxito",
      icon: "success",
      text: "Foto eliminada con éxito",
      showConfirmButton: false,
      timer: 1500
    }).fire()
  }

}
