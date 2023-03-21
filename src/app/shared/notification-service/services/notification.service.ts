import type { OnDestroy } from '@angular/core';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { SubSink } from '../../utils/subsink.util';
import { MessageComponent } from '../components/message/message.component';
import type { ErrorConfig } from '../models/error-config.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService implements OnDestroy {
  private sub = new SubSink();

  constructor(
    private readonly router: Router,
    private readonly dialog: MatDialog,
  ) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  showErrorMessage(errorConfig?: ErrorConfig): void {
    const redirect = errorConfig ? errorConfig.redirect : null;
    const iconUrl = errorConfig?.iconUrl ? errorConfig.iconUrl : '../../../assets/icons/yellow-triangle.svg';
    const dialogTitle = 'Something went wrong';

    const dialogRef = this.dialog.open(MessageComponent, {
      panelClass: 'message-dialog__panel',
      maxWidth: 'auto',
      autoFocus: false,
      data: {
        title: dialogTitle,
        subtitle: 'Please try again later',
        button: 'Go to ...',
        redirect,
        iconUrl,
      },
    });

    this.sub.sink = dialogRef.afterClosed().subscribe(() => {
      if (redirect) {
        this.router.navigateByUrl(redirect);
      }
    });
  }
}
