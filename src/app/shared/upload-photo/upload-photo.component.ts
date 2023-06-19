import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserUpdate} from "../model/user-update";
import {BsModalRef} from "ngx-bootstrap/modal";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {take} from "rxjs";
import Swal from "sweetalert2";
import {PhotoService} from "../../services/photo.service";
import {Router} from "@angular/router";
import {EventService} from "../../services/event.service";

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.css']
})
export class UploadPhotoComponent implements OnInit, AfterViewInit {

  save = false;
  user: UserUpdate
  title: string;
  photoUploaded: any;
  newPhoto: any;
  newPhotoForm: FormGroup;
  base64textString: string;

  @ViewChild('imagen') photoUploadInput: any;

  constructor(
    public bsModalRef: BsModalRef,
    private userService: UserService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private photoService: PhotoService,
    private eventService: EventService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.newPhotoForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    this.photoUploaded = this.photoUploadInput.nativeElement;
    this.photoUploaded.uploaded = false;
    this.cdr.detectChanges();
  }

  onSubmit() {
    if (!this.newPhotoForm.valid || !this.newPhoto) {
      this.newPhotoForm.markAllAsTouched();
      this.showAlertError()
      return;
    }

    let photo = {
      title: this.newPhotoForm.value.title,
      description: this.newPhotoForm.value.description,
      photo: this.base64textString
    }

    this.photoService.create(photo).pipe(take(1))
      .subscribe(() => {
        this.showAlertSuccessful()
        const routeActual = this.router.url
        this.router.navigate([routeActual])
        this.eventService.photosUpdated.next('')
        this.bsModalRef.hide();
      })
  }

  handleReaderLoaded(e) {
    this.base64textString = btoa(e.target.result);
  }

  getFile(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.photoUploaded.uploaded = true;
      this.photoUploaded.src = URL.createObjectURL(file)
      this.newPhoto = file;
      const reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
      return;
    }
    this.showAlertError()
    this.newPhoto = null;
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

  showAlertSuccessful() {
    Swal.mixin({
      title: "Añadido con éxito",
      icon: "success",
      text: "Foto añadida con éxito",
      showConfirmButton: false,
      timer: 1500
    }).fire()
  }

}
