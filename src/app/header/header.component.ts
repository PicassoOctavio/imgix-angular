import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  showMenu: boolean = false;
  constructor() {}

  public onNavigate( url: string ): void {
    window.open(url, "_blank")
  }

}
