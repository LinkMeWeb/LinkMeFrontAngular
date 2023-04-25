import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ResponseLogin } from '../shared/model/response-login';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  @ViewChild('navbar') navbar: any;

  loginForm: FormGroup;
  submitted = false;
  token: any;


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
    this.submitted = true;

    if (!this.loginForm.valid) {
      return;
    }

    this.authService
      .login(this.loginForm.value)
      .pipe(take(1))
      .subscribe((res) => {
        this.token = res.token;
        localStorage.setItem('token', this.token);
        if (this.submitted) this.router.navigate(['']);
        this.appComponent.showNavbar = true;
      });
  }
}
