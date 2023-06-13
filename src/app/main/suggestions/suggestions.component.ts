import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/model/user.interface';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
export class SuggestionsComponent implements OnInit{

  userSuggestions: User[];

  constructor(
    private userService: UserService
  ){

  }

  ngOnInit(): void {
    this.userService.getAllByParams({limit: 10}).pipe(take(1))
    .subscribe((users: User[]) => {
      this.userSuggestions = users;
    })
  }

}
