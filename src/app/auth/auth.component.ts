import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, ComponentFactoryResolver, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { SubSink } from '../shared/utils/subsink.util';
import { AuthResponse } from './models/auth-response.interface';
import { AuthService } from './services/auth.service';
import { AlertComponent } from '../shared/notification-service/components/alert/alert.component';
import { PlaceholderDirective } from '../shared/utils/placeholder.directive';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceholderDirective) alertPlaceholder!: PlaceholderDirective;

  isLoginMode = true;
  isLoading = false;
  error: string | null = null;

  private subs = new SubSink();
  private closeSub = new Subscription();

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly store: Store<fromApp.AppState>,
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.store.select('auth').subscribe(
      (authState) => {
        this.isLoading = authState.loading;
        this.error = authState.authError;

        if (this.error) {
          this.showErrorAlert(this.error);
        }
      },
    );
  }

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
    // let authObs$: Observable<AuthResponse | HttpErrorResponse>;
    const { email, password } = form.value;
    // this.isLoading = true;

    if (this.isLoginMode) {
      // authObs$ = this.authService.login(email, password);
      this.store.dispatch(new AuthActions.LoginStart({ email, password }));
    } else {
      // authObs$ = this.authService.signUp(email, password);
      this.store.dispatch(new AuthActions.SignupStart({ email, password }));
    }

    form.reset();
  }

  onClose(): void {
    // this.error = null;
    this.store.dispatch(new AuthActions.ClearError());
  }

  // FIXME: Old approach
  private showErrorAlert(message: string | null): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertPlaceholder.viewContainerRef;

    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(componentFactory);
    componentRef.instance.message = message ?? '';
    this.cdr.markForCheck();
    this.closeSub = componentRef.instance.handleClose.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
