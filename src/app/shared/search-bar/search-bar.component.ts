import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../model/user.interface';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  user: User;

  constructor(
    private userService: UserService
  ) {
    this.userService.find(1).
    subscribe(res => this.user = res)
  }

  ngOnInit() {

  }

}
