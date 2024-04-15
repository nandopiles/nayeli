import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isMenuOpen: boolean = true;

  /**
   * Displays the mobile's menu
   * @returns {void}
   */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}