import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
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
