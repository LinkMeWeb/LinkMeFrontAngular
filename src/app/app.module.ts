import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProfileComponent} from './profile/profile.component';
import {SearchBarComponent} from './shared/search-bar/search-bar.component';
import {HttpClientModule} from '@angular/common/http';
import {MainComponent} from './main/main.component';
import {PhotoComponent} from './photo/photo.component';
import {LoginComponent} from './access/login/login.component';
import {RegisterComponent} from './access/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PhotoModelComponent} from './shared/photo-model/photo-model.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModalModule} from 'ngx-bootstrap/modal';
import {SharedModule} from './shared/shared.module';
import {SuggestionsComponent} from './main/suggestions/suggestions.component';
import {PhotoUserComponent} from './main/photo-user/photo-user.component';
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {CommentPhotoComponent} from './main/comment-photo/comment-photo.component';
import {fadeInOnEnterAnimation} from "angular-animations";

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    SearchBarComponent,
    MainComponent,
    PhotoComponent,
    LoginComponent,
    RegisterComponent,
    PhotoModelComponent,
    // TODO migrar al shared component
    //ModalEditProfileComponent,
    SuggestionsComponent,
    PhotoUserComponent,
    CommentPhotoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ModalModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    TooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
