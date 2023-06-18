import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {UserService} from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import {switchMap, take} from 'rxjs';
import {AuthService} from 'src/app/services/auth.service';
import {User} from "../model/user.interface";

@Component({
  selector: 'app-modal-insert-about-user',
  templateUrl: './modal-insert-about-user.component.html',
  styleUrls: ['./modal-insert-about-user.component.css']
})
export class ModalInsertAboutUserComponent implements OnInit {

  save = false;
  aboutForm: FormGroup;
  user: User
  title: string;
  profileImage: File;
  token: string;
  base64textString: string;

  constructor(
    public bsModalRef: BsModalRef,
    private userService: UserService,
    private authService: AuthService,
  ) {

  }

  ngOnInit() {
    this.aboutForm = new FormGroup({
      aboutMe: new FormControl('', [Validators.required, Validators.minLength(5)])
    })
  }

  onSubmit() {
    if (!this.aboutForm.valid) {
      return this.showAlertError();
    }
    this.user.about = this.aboutForm.get('aboutMe').value;
    this.user.photo_path = this.profileImage ? this.base64textString : 'default';
    const prevPass = this.user.password;


    this.userService.create(this.user).pipe(
      switchMap((userRegistered) => {
        this.user = userRegistered;
        return this.authService.login({nickname: this.user.nickname, password: prevPass}).pipe(
          take(1)
        );
      })
    ).subscribe((userLogged) => {
      this.token = userLogged.token;
      this.save = true;
      this.bsModalRef.hide();
      this.showAlertSuccessful()
    })
  }

  getFile(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.profileImage = file;
      const reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
      return;
    }
    this.profileImage = null;
  }

  handleReaderLoaded(e) {
    this.base64textString = btoa(e.target.result);
  }

  showAlertSuccessful() {
    Swal.mixin({
      title: "Añadido con éxito",
      icon: "success",
      text: "Foto añadida con éxito",
      showConfirmButton: false,
      timer: 1500
    }).fire()
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
