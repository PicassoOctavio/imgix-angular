import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-mainImage',
  templateUrl: './mainImage.component.html',
  styleUrls: ['./mainImage.component.scss']
})
export class MainImageComponent implements OnInit {

  @Input() image: string = '';

  constructor() {
  }

  ngOnInit() {
  }

}
