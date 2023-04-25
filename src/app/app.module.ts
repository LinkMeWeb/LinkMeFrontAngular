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
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PhotoModelComponent } from './shared/photo-model/photo-model.component';
@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    SearchBarComponent,
    MainComponent,
    PhotoComponent,
    LoginComponent,
    RegisterComponent,
    PhotoModelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
