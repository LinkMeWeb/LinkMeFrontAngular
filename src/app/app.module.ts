import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './profile/profile.component';
import { SearchBarComponent } from './shared/search-bar/search-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    SearchBarComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
