import { Component } from '@angular/core';

// service
import { ImagesServices } from './services/images.services';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularApp';
  images: any = [];
  image: string = '';

  constructor(
    private service: ImagesServices,
  ) {
    this.getImages();
   }

  getImages() {
    this.service.getImagesfromAPI().subscribe( data => {
      this.images = data;
      this.image = this.images[0].url;
    });
  }

  refreshUrl(url: string) {
    this.image = url;
  }

}
