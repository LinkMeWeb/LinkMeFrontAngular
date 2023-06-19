import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "./shared/model/user.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'linkme-front';
  showNavbar = true;
  user: User

  constructor(
    private router: Router
  ) {

  }

}
