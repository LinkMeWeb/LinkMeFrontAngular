import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {debounceTime, filter, fromEvent, switchMap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements AfterViewInit {

  suggestedUsers: any
  inputElm
  @ViewChild('searchInput') search: ElementRef;

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
  }

  ngAfterViewInit() {
    this.inputElm = this.search.nativeElement;

    fromEvent(this.inputElm, 'keyup')
      .pipe(
        debounceTime(300),
        filter(() => this.inputElm.value),
        switchMap(() => this.userService.searchUser(this.inputElm.value))
      )
      .subscribe(res => {
        this.suggestedUsers = res
      });
  }

  goToUserProfile(nickname) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/profile/' + nickname])
      this.inputElm.value = ''
      this.suggestedUsers = []
    })
  }

}
