import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ErrorDialogData } from '../../models/error-dialog-data.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
  constructor(
    public dialogRef: MatDialogRef<MessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ErrorDialogData,
  ) { }

  public onClick(): void {
    this.dialogRef.close();
  }
}
