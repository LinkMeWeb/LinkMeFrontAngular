import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppModule } from '../app.module';
import { ModalNewUserComponent } from './modal-new-user/modal-new-user.component';



@NgModule({
  declarations: [
    ModalNewUserComponent
  ],
  imports: [
    CommonModule,
    AppModule
  ]
})
export class SharedModule { }
