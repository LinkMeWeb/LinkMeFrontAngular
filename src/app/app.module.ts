import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './profile/profile.component';
import { SearchBarComponent } from './shared/search-bar/search-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { PhotoComponent } from './photo/photo.component';
import { LoginComponent } from './access/login/login.component';
import { RegisterComponent } from './access/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhotoModelComponent } from './shared/photo-model/photo-model.component';
import { ModalEditProfileComponent } from './shared/modal-edit-profile/modal-edit-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalInsertAboutUserComponent } from './shared/modal-insert-about-user/modal-insert-about-user.component';
import { SharedModule } from './shared/shared.module';
import { SuggestionsComponent } from './main/suggestions/suggestions.component';
import { PhotoUserComponent } from './main/photo-user/photo-user.component';
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
    PhotoUserComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
