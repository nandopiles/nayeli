import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input() isAlertHidden: boolean = false;

  /**
   * Closes the alert message.
   * @returns {void}
   */
  closeAlert(): void {
    this.isAlertHidden = true;
  }
}
