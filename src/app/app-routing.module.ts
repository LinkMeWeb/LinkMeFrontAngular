import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { MainComponent } from './main/main.component';
import { PhotoComponent } from './photo/photo.component';
import { LoginComponent } from './access/login/login.component';
import { UserGuard } from './shared/guards/user.guard';
import { RegisterComponent } from './access/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
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
    canActivate: [UserGuard]

  },
  {
    path: 'profile/:id/photo/:idPhoto',
    component: PhotoComponent,
    canActivate: [UserGuard]
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
