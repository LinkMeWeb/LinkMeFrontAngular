import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../model/user.interface';
import { take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  user: User;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: Router
  ) {
    this.userService.find(1).
    subscribe(res => this.user = res)
  }

  ngOnInit() {

  }

  logout() {
    if (localStorage.getItem('token')) {
      this.authService.logout().pipe(take(1))
      .subscribe(() => {
        localStorage.removeItem('token')
        this.route.navigate(['/login'])
      })
    }
  }

}
