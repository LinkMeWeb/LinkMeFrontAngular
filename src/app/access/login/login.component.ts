import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {AppComponent} from '../../app.component';
import {switchMap, take, tap} from 'rxjs';
import {User} from "../../shared/model/user.interface";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  @ViewChild('navbar') navbar: any;

  loginForm: FormGroup;
  token: string = '';
  user: User;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private appComponent: AppComponent
  ) {
    this.appComponent.showNavbar = false;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      nickname: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {

    if (!this.loginForm.valid) {
      return;
    }

    this.authService.login(this.loginForm.value).pipe(
      take(1),
      switchMap(res => this.authService.getOwnUser().pipe(
        tap(res => {
          this.user = res
        })
      ))
    ).subscribe(() => {
      this.appComponent.showNavbar = true;
      this.appComponent.user = this.user;
      this.router.navigate(['/']);
    })
  }

}
