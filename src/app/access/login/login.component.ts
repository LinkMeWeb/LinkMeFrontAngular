import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {AppComponent} from '../../app.component';
import {switchMap, take, tap} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  @ViewChild('navbar') navbar: any;

  loginForm: FormGroup;
  token: string = '';


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
      tap((res) => {
        this.token = res.token;
        localStorage.setItem('token', this.token);
      }),
      switchMap(() => {
          return this.authService.getOwnUser().pipe(take(1));
      })
    ).subscribe(res => {
      this.appComponent.user = res;
      this.appComponent.showNavbar = true;
      this.router.navigate(['/']);
    })
  }

}
