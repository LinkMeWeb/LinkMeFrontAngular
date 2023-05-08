import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { mergeMap, switchMap, take, tap, zip } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/model/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup
  aboutForm: FormGroup
  user: User
  // registered = false;
  registered = true;

  constructor(
    private formBuilder: FormBuilder,
    private appComponent: AppComponent,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef
  )
  {
    if (localStorage.getItem('token')) {
      // this.router.navigate([''])
    }
    this.appComponent.showNavbar = false;
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      nickname: ['', Validators.required],
      email: ['', [Validators.required, Validators.minLength(5), Validators.email]],
      password: ['', Validators.required],
      repeatPassword: ['', [Validators.required]],
      // this.passwordMatch.bind(this)
      // TODO comprobar el match de la password
    },{updateOn: 'change'})

    this.aboutForm = this.formBuilder.group({
      aboutme: ['', Validators.required],
      image: ['', Validators.required]
    },{updateON: 'change'})
  }

  onSubmit() {

    if (!this.registerForm.valid)  {
      return;
    }

    this.userService.create(this.registerForm.value).pipe(
      switchMap(userRegistered => {
        this.user = userRegistered;
        return this.authService.login({nickname: this.user.nickname, password: this.registerForm.get('password').value}).pipe(
          take(1)
        );
      })
    ).subscribe(userLogged => {
      localStorage.setItem('token', userLogged.token);
      this.putInformationOnProfile();
    });
  }

  onUpdate() {

  }

  putInformationOnProfile() {
    // TODO comprobar q el token es de esa persona
    if (!localStorage.getItem('token')) {
      return;
    }
    this.registered = true;
  }

  passwordMatch(control) {
    const password = this.registerForm.get('password');
    const confirmPassword = control.value;

    if (password && confirmPassword !== password.value) {
      return {
        passwordMatch: true,
      };
    }

    return null;
  }

}
