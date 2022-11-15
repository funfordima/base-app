import { Route, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { SubSink } from '../shared/utils/subsink.util';
import { AuthResponse } from './models/auth-response.interface';
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
    private readonly router: Router,
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

    this.error = null;
    let authObs$: Observable<AuthResponse | HttpErrorResponse>;
    const { email, password } = form.value;
    this.isLoading = true;

    if (this.isLoginMode) {
      authObs$ = this.authService.login(email, password);
    } else {
      authObs$ = this.authService.signUp(email, password);
    }

    this.subs.sink = authObs$.subscribe(
      (res) => {
        console.log(res);
        this.isLoading = false;
        this.error = null;
        this.router.navigate(['/recipes']);
        this.cdr.markForCheck();
      },
      (err) => {
        console.log(err);
        this.error = err?.error?.error ? err.error.error : 'An error occurred';
        this.isLoading = false;

        this.cdr.markForCheck();
      });

    form.reset();
  }
}
