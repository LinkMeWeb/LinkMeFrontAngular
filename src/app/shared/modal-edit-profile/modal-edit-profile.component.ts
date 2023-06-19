import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {UserService} from 'src/app/services/user.service';
import {debounceTime, filter, fromEvent, switchMap} from "rxjs";

@Component({
  selector: 'app-modal-edit-profile',
  templateUrl: './modal-edit-profile.component.html',
  styleUrls: ['./modal-edit-profile.component.css'],
})
export class ModalEditProfileComponent implements OnInit, AfterViewInit {

  title?: string;
  id: string;
  closeBtnName?: string;
  editProfile: FormGroup;
  save = false;
  base64textString: string;

  @ViewChild('nickname') nickname: ElementRef
  @ViewChild('email') email: ElementRef

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.editProfile = this.formBuilder.group({
      name: ['', Validators.minLength(3)],
      nickname: [''],
      email: ['', Validators.email],
      password: ['', Validators.minLength(4)],
      aboutMe: ['', Validators.minLength(4)],
    }, {updateOn: 'change'})
  }

  ngAfterViewInit() {
    let nicknameInput = this.nickname.nativeElement
    let emailInput = this.email.nativeElement

    const nickname = this.editProfile.get('nickname')
    fromEvent(nicknameInput, 'keyup').pipe(
      debounceTime(300),
      filter(() => nicknameInput.value),
      switchMap(() => this.userService.nicknameExists(nickname.value))
    ).subscribe((res: boolean) => {
      if (res) {
        nickname.setErrors({exists: true})
      }
    })

    const email = this.editProfile.get('email')
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
    const name = this.editProfile.get('name')
    const nickname = this.editProfile.get('nickname')
    const email = this.editProfile.get('email')
    const password = this.editProfile.get('password')
    const about = this.editProfile.get('aboutMe')

    if (this.editProfile.invalid) {
      return;
    }

    const objectToUpdate = {
      id: this.id,
      name: name?.value,
      nickname: nickname?.value,
      email: email?.value,
      password: password?.value,
      about: about.value
    }

    if (this.editProfile.valid) {
      const user = this.formatUser(objectToUpdate);

      this.userService.update(user)
        .subscribe(() => {
          this.save = true;
          this.bsModalRef.hide();
        })
    }
  }

  getFile(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
      return;
    }
  }

  handleReaderLoaded(e) {
    this.base64textString = btoa(e.target.result);
  }

  formatUser(form) {
    const formNew: any = {
      id: form.id,
    }
    if (form.name) {
      formNew.name = form.name
    }
    if (form.email) {
      formNew.email = form.email
    }
    if (form.password) {
      formNew.password = form.password
    }
    if (form.nickname) {
      formNew.nickname = form.nickname
    }
    if (form.about) {
      formNew.about = form.about
    }
    if (this.base64textString) {
      formNew.photo_path = this.base64textString
    }
    return formNew;
  }

}
