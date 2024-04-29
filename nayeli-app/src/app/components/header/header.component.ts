import { Component, Input } from '@angular/core';
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
  @Input() isSidebarOpen: boolean | undefined = false;

  /**
   * Displays the mobile's menu.
   * @returns {void}
   */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /**
   * Displays the Sidebar where is going to be the login, register and conf functionality.
   * @returns {void}
   */
  toggleSidebar(isOpened?: boolean): void {
    isOpened === undefined ? this.isSidebarOpen = true : this.isSidebarOpen = isOpened;
    console.log(this.isSidebarOpen ? "Sidebar is opened" : "Sidebar is closed");
  }
}
