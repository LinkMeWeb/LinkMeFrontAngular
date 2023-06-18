import {Component, Input} from '@angular/core';
import {UserService} from 'src/app/services/user.service';
import {User} from '../model/user.interface';
import {take} from 'rxjs';
import {AuthService} from 'src/app/services/auth.service';
import {Router} from '@angular/router';
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {UploadPhotoComponent} from "../upload-photo/upload-photo.component";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  @Input() user: User;
  bsModalRef?: BsModalRef;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: Router,
    private modalService: BsModalService,
    private appComponent: AppComponent
  ) {
  }

  logout() {
    this.authService.logout().pipe(take(1))
      .subscribe(() => {
        this.appComponent.showNavbar = false
        this.route.navigate(['/login'])
      })
  }

  uploadPhoto() {
    const initialState: ModalOptions = {
      class: 'modal-dialog-centered modal-lg',
      initialState: {
        title: 'Subir imagen',
        user: this.user
      }
    };
    this.bsModalRef = this.modalService.show(UploadPhotoComponent, initialState);
    this.bsModalRef.onHidden.subscribe(() => {
    })
  }

}
