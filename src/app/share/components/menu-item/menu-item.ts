import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  imports: [],
  templateUrl: './menu-item.html',
  styleUrl: './menu-item.css',
})
export class MenuItem {

  @Input() title: string = '';
  submenuOpen: boolean = false;

  toggleSubmenu() {
    this.submenuOpen = !this.submenuOpen;
  }

}
