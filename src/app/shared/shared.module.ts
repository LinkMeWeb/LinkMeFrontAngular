import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppModule} from '../app.module';
import {ModalNewUserComponent} from './modal-new-user/modal-new-user.component';
import {ModalInsertAboutUserComponent} from './modal-insert-about-user/modal-insert-about-user.component';
import {ModalEditProfileComponent} from './modal-edit-profile/modal-edit-profile.component';
import {ModalPhotoComponent} from './modal-photo/modal-photo.component';
import {SearchInputComponent} from './search-input/search-input.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ModalNewUserComponent,
    ModalPhotoComponent,
    SearchInputComponent,
    ModalEditProfileComponent,
    ModalInsertAboutUserComponent,
  ],
  exports: [
    SearchInputComponent,
    ModalEditProfileComponent,
    ModalInsertAboutUserComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule {
}
