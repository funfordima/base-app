import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { SubSink } from '../shared/utils/subsink.util';
import { AuthResponse } from './models/auth-response.interface';
import { AuthService } from './services/auth.service';
import { AlertComponent } from '../shared/notification-service/components/alert/alert.component';
import { PlaceholderDirective } from '../shared/utils/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnDestroy {
  @ViewChild(PlaceholderDirective) alertPlaceholder!: PlaceholderDirective;

  isLoginMode = true;
  isLoading = false;
  error: string | null = null;

  private subs = new SubSink();
  private closeSub = new Subscription();

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly cdr: ChangeDetectorRef,
  ) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
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
        this.showErrorAlert(this.error);

        this.cdr.markForCheck();
      });

    form.reset();
  }

  onClose(): void {
    this.error = null;
  }

  // FIXME: Old approach
  private showErrorAlert(message: string | null): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertPlaceholder.viewContainerRef;

    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(componentFactory);
    componentRef.instance.message = message ?? '';
    this.closeSub = componentRef.instance.handleClose.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
