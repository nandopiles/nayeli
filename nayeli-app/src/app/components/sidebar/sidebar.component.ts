import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoginComponent } from '../../views/login/login.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() isSidebarOpen: boolean | undefined = false;
  @Output() close = new EventEmitter<boolean>();

  /**
   * Closes the Sidebar component.
   * @returns {void}
   */
  closeSidebar(): void {
    this.isSidebarOpen = false;

    this.close.emit(this.isSidebarOpen);
  }
}
