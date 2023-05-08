import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { take, zip } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from '../model/user.interface';

@Component({
  selector: 'app-modal-edit-profile',
  templateUrl: './modal-edit-profile.component.html',
  styleUrls: ['./modal-edit-profile.component.css'],
})
export class ModalEditProfileComponent {

  title?: string;
  id: string;
  closeBtnName?: string;
  editProfile: FormGroup;
  save = false;

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
    },{updateOn: 'change'})
  }

  onSubmit() {
    const name = this.editProfile.get('name')
    const nickname = this.editProfile.get('nickname')
    const email = this.editProfile.get('email')
    const password = this.editProfile.get('password')

    // TODO comprobar que el nickname sea único y el email IMPLEMENTAR FOTOS

    // TODO Implementar tanto about me como profile picture

    const objectToUpdate = {
      id: this.id,
      name: name.value,
      nickname: nickname?.value,
      email: email?.value,
      password: password.value
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

  formatUser(form) {

    const formNew: User = {
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
    return formNew;
  }

}
