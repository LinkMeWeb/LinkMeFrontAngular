import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './access/login/login.component';
import { UserGuard } from './shared/guards/user.guard';
import { RegisterComponent } from './access/register/register.component';
import {LikedPhotosComponent} from "./liked-photos/liked-photos.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'likedPhotos',
    component: LikedPhotosComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'profile/:nickname',
    component: ProfileComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '**',
    redirectTo: '',
    canActivate: [UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
