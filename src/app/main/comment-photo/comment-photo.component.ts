import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Comment} from "../../shared/model/comment";
import {take} from "rxjs";
import {User} from "../../shared/model/user.interface";

@Component({
  selector: 'app-comment-photo',
  templateUrl: './comment-photo.component.html',
  styleUrls: ['./comment-photo.component.css']
})
export class CommentPhotoComponent implements OnInit {

  @Input() comment: Comment
  user: User

  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.userService.find(this.comment.user_id).pipe(take(1))
      .subscribe((res: User) => this.user = res)
  }

}
