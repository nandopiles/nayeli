import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen: boolean = true;

  /**
   * Displays the mobile's menu
   * @returns {void}
   */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
