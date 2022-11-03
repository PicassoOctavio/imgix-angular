import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  @Input() images: any = [];
  @Output() imageUrl = new EventEmitter<string>();

  constructor(
  ) { } 

  ngOnInit() {

  }

  selectImage( url: string ) {
    this.imageUrl.emit(url);
  }

}
