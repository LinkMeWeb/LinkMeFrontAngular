import { Component, Input } from '@angular/core';
import { Photo } from '../model/photo.interface';

@Component({
  selector: 'app-photo-model',
  templateUrl: './photo-model.component.html',
  styleUrls: ['./photo-model.component.css']
})
export class PhotoModelComponent {

  @Input() photo: Photo

}
