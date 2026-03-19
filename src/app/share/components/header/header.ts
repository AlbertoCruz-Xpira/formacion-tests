import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  submenuOpen = false;
  
  toggleSubmenu() {
    this.submenuOpen = !this.submenuOpen;
  }
}
