import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { Photo } from '../shared/model/photo.interface';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  photos: Photo[]

  constructor(
    private photoService: PhotoService,
  ) {
  }

  ngOnInit(): void {
    this.photoService.getAll().subscribe(photo => {
      this.photos = photo
      console.log(this.photos)
    })
  }

}
