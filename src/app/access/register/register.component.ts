import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { mergeMap, switchMap, take, tap, zip } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ModalEditProfileComponent } from 'src/app/shared/modal-edit-profile/modal-edit-profile.component';
import { ModalInsertAboutUserComponent } from 'src/app/shared/modal-insert-about-user/modal-insert-about-user.component';
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
  registered = false;
  imageProfile: File;
  bsModalRef: BsModalRef;
  token: string;

  constructor(
    private formBuilder: FormBuilder,
    private appComponent: AppComponent,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private modalService: BsModalService
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
  }

  onSubmit() {
    if (this.registered) {
      return;
    }
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
      this.token = userLogged.token;
      this.registered = true;
      this.openAboutModal();
    });
  }

  openAboutModal() {
    const initialState: ModalOptions = {
      class: 'modal-dialog-centered modal-lg',
      initialState: {
        user: this.user,
        title: "Rellene los siguientes campos"
      }
    }
    this.bsModalRef = this.modalService.show(ModalInsertAboutUserComponent, initialState);
    this.bsModalRef.onHidden.subscribe(() => {
      if (this.bsModalRef.content.save) {
      localStorage.setItem('token', this.token);
        this.router.navigate(['']);
      }
    })
  }

  // onUpdate() {
  //   if (this.aboutForm.valid) {
  //     const userToUpdate = {
  //       id: this.user,
  //       about: this.aboutForm.get('aboutme').value,
  //       photoPath: this.aboutForm.get('image').value
  //     }

  //     this.userService.update(this.user).pipe(take(1))
  //     .subscribe(() => console.log("HOLA"));
  //   }
  // }


  private passwordMatch(control) {
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
