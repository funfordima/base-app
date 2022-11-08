import { Component, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';

import { SubSink } from '../shared/utils/subsink.util';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;

  private subs = new SubSink();

  constructor(
    private readonly authService: AuthService,
    private readonly cdr: ChangeDetectorRef,
  ) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }

    const { email, password } = form.value;
    this.isLoading = true;

    if (this.isLoginMode) {
      // ...
    } else {
      this.subs.sink = this.authService.signUp(email, password).subscribe(
        () => {
          this.isLoading = false;
          this.cdr.markForCheck();
        },
        (err) => {
          this.error = err?.error?.error ? err.error.error : 'An error occurred';
          this.isLoading = false;

          this.cdr.markForCheck();
        });
    }

    form.reset();
  }
}
