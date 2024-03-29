import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProfileComponent} from './profile/profile.component';
import {SearchBarComponent} from './shared/search-bar/search-bar.component';
import {HttpClientModule} from '@angular/common/http';
import {MainComponent} from './main/main.component';
import {LoginComponent} from './access/login/login.component';
import {RegisterComponent} from './access/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModalModule} from 'ngx-bootstrap/modal';
import {SharedModule} from './shared/shared.module';
import {TooltipModule} from "ngx-bootstrap/tooltip";
import { LikedPhotosComponent } from './liked-photos/liked-photos.component';


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    SearchBarComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    LikedPhotosComponent
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
  bootstrap: [AppComponent],
})
export class AppModule {
}
