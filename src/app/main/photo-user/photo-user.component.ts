import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../shared/model/user.interface";
import {Photo} from "../../shared/model/photo.interface";
import {take} from "rxjs";
import {UserService} from "../../services/user.service";
import {Comment} from "../../shared/model/comment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-photo-user',
  templateUrl: './photo-user.component.html',
  styleUrls: ['./photo-user.component.css']
})
export class PhotoUserComponent implements OnInit {

  @Input() user: User
  @Input() photo: Photo
  userLiked = false
  comments: Comment[]
  commentForm: FormGroup;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required]
    });

    this.userService.liked(this.photo.id).pipe(take(1))
      .subscribe((res) => {
        this.userLiked = res
      })
    this.getComments();
  }

  private getComments() {
    this.userService.getComments(this.photo.id).pipe(take(1))
      .subscribe((res: Comment[]) => this.comments = res)
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

  likeRequest() {
    this.userService.like(this.photo.id).pipe(take(1))
      .subscribe((res) => {
        this.userLiked = !!res
        this.userLiked ? this.photo.likes++ : this.photo.likes--
      })
  }

}
