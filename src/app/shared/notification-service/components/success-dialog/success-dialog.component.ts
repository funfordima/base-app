import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import type { SuccessDialogModel } from '../../models';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<SuccessDialogModel>,
  ) { }
}
