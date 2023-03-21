import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent {
  @Input() message = '';
  @Output() handleClose = new EventEmitter<void>();

  onClose(): void {
    this.handleClose.emit();
  }
}
