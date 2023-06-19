import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalInsertAboutUserComponent} from './modal-insert-about-user/modal-insert-about-user.component';
import {ModalEditProfileComponent} from './modal-edit-profile/modal-edit-profile.component';
import {ModalPhotoComponent} from './modal-photo/modal-photo.component';
import {SearchInputComponent} from './search-input/search-input.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UploadPhotoComponent} from './upload-photo/upload-photo.component';
import {EventService} from "../services/event.service";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {PhotoUserComponent} from "./photo-user/photo-user.component";
import {CommentPhotoComponent} from "./comment-photo/comment-photo.component";


@NgModule({
  declarations: [
    ModalPhotoComponent,
    SearchInputComponent,
    ModalEditProfileComponent,
    ModalInsertAboutUserComponent,
    UploadPhotoComponent,
    PhotoUserComponent,
    CommentPhotoComponent
  ],
  exports: [
    SearchInputComponent,
    ModalEditProfileComponent,
    ModalInsertAboutUserComponent,
    UploadPhotoComponent,
    PhotoUserComponent,
    CommentPhotoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TooltipModule
  ],
  providers: [
    EventService
  ]
})
export class SharedModule {
}
