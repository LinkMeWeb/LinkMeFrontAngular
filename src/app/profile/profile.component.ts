import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../shared/model/user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  styleUrls: ['./profile.component.css'],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  nickname: string;
  user: User;
  owner: boolean = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.nickname = this.route.snapshot.params['nickname'];
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

}
