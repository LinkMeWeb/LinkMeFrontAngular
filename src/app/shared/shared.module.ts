import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalNewUserComponent} from './modal-new-user/modal-new-user.component';
import {ModalInsertAboutUserComponent} from './modal-insert-about-user/modal-insert-about-user.component';
import {ModalEditProfileComponent} from './modal-edit-profile/modal-edit-profile.component';
import {ModalPhotoComponent} from './modal-photo/modal-photo.component';
import {SearchInputComponent} from './search-input/search-input.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UploadPhotoComponent} from './upload-photo/upload-photo.component';


@NgModule({
  declarations: [
    ModalNewUserComponent,
    ModalPhotoComponent,
    SearchInputComponent,
    ModalEditProfileComponent,
    ModalInsertAboutUserComponent,
    UploadPhotoComponent,
  ],
  exports: [
    SearchInputComponent,
    ModalEditProfileComponent,
    ModalInsertAboutUserComponent,
    UploadPhotoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule {
}
