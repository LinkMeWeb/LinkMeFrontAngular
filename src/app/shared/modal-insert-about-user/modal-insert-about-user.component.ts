import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { UserUpdate } from '../model/user-update';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-insert-about-user',
  templateUrl: './modal-insert-about-user.component.html',
  styleUrls: ['./modal-insert-about-user.component.css']
})
export class ModalInsertAboutUserComponent implements OnInit{

  save = false;
  aboutForm: FormGroup;
  user: UserUpdate
  title: string;
  profileImage: File

  constructor(
    public bsModalRef: BsModalRef,
    private userService: UserService,
  ) {

  }
  
  ngOnInit() {
    this.aboutForm = new FormGroup({
      aboutMe: new FormControl('', [Validators.required, Validators.minLength(5)])
    })
  }

  onSubmit() {
    if (!this.aboutForm.valid || !this.profileImage) {
      return this.showAlertError();
    }
    this.user.about = this.aboutForm.get('aboutMe').value;
    this.user.photo_path = this.profileImage
    this.userService.update(this.user)
    .subscribe((res) => {
      console.log(res);
      
      this.save = true;
      this.bsModalRef.hide();
    });
  }

  getFile(event) {
    let file = event.target.files[0];
    this.profileImage = null;
    if (file && file.type.startsWith('image/')) {
      this.profileImage = file;
    }
  }

  showAlertError() {
    Swal.mixin({
      title: "Error",
      icon: "error",
      text: "Asegurate de que todos los campos sean válidos y estén rellenados",
      showConfirmButton: false,
      timer: 1500      
    }).fire()
  }

}
