import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';
import {debounceTime, filter, fromEvent, switchMap} from 'rxjs';
import {AppComponent} from 'src/app/app.component';
import {AuthService} from 'src/app/services/auth.service';
import {UserService} from 'src/app/services/user.service';
import {ModalInsertAboutUserComponent} from 'src/app/shared/modal-insert-about-user/modal-insert-about-user.component';
import {User} from 'src/app/shared/model/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {

  registerForm: FormGroup
  user: User
  registered = false;
  bsModalRef: BsModalRef;
  token: string;

  @ViewChild('nickname') nickname: ElementRef
  @ViewChild('email') email: ElementRef
  @ViewChild('repeatPassword') repeatPassword: ElementRef

  constructor(
    private formBuilder: FormBuilder,
    private appComponent: AppComponent,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private modalService: BsModalService,
  ) {
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
      checked: ['', [Validators.required]]
    }, {updateOn: 'change'})
  }

  ngAfterViewInit() {
    let nicknameInput = this.nickname.nativeElement
    let emailInput = this.email.nativeElement

    fromEvent(this.repeatPassword.nativeElement, 'change')
      .subscribe(() => this.validatePasswordsMatch())

    this.nicknameCheck(nicknameInput);
    this.emailCheck(emailInput);
  }

  private nicknameCheck(nicknameInput) {
    const nickname = this.registerForm.get('nickname')
    fromEvent(nicknameInput, 'keyup').pipe(
      debounceTime(300),
      filter(() => nicknameInput.value),
      switchMap(() => this.userService.nicknameExists(nickname.value))
    ).subscribe((res: boolean) => {
      if (res) {
        nickname.setErrors({exists: true})
      }
    })
  }

  private emailCheck(emailInput) {
    const email = this.registerForm.get('email')
    fromEvent(emailInput, 'keyup').pipe(
      debounceTime(300),
      filter(() => emailInput.value),
      switchMap(() => this.userService.emailExists(email.value))
    ).subscribe((res: boolean) => {
      if (res) {
        email.setErrors({exists: true})
      }
    })
  }

  onSubmit() {
    if (this.registered) {
      return;
    }
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched()
      return;
    }

    this.user = this.registerForm.value;

    this.registered = true;
    this.openAboutModal();
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
        localStorage.setItem('token', this.bsModalRef.content.token);
        this.appComponent.showNavbar = true;
        this.router.navigate(['/']);
      }
    })
  }

  validatePasswordsMatch() {
    const confirmPasswordForm = this.registerForm.get('repeatPassword')
    const password = this.registerForm.get('password').value;
    const confirmPassword = confirmPasswordForm.value;
    if (password !== confirmPassword) {
      confirmPasswordForm.setErrors({mismatchPassword: true})
    }
  }

}
