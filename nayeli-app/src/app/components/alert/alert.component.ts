import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input() isAlertHidden: boolean = false;
  @Output() isAlertReadyToClose = new EventEmitter<boolean>();

  /**
   * Closes the alert message.
   * @returns {void}
   */
  closeAlert(): void {
    this.isAlertHidden = true;
    this.isAlertReadyToClose.emit(this.isAlertHidden);
  }
}
