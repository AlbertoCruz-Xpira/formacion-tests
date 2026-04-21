import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from '../menu-item/menu-item';

@Component({
  selector: 'app-header',
  imports: [MenuItem, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  submenuOpen = false;
  
  toggleSubmenu() {
    this.submenuOpen = !this.submenuOpen;
  }
}
