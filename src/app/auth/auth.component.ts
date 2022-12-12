import type { OnDestroy, OnInit } from '@angular/core';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import type { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AlertComponent } from '../shared/notification-service/components/alert/alert.component';
import { PlaceholderDirective } from '../shared/utils/placeholder.directive';
import { SubSink } from '../shared/utils/subsink.util';
import type * as fromApp from '../store/app.reducer';
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
    const { email, password } = form.value;

    if (this.isLoginMode) {
      this.store.dispatch(new AuthActions.LoginStart({ email, password }));
    } else {
      this.store.dispatch(new AuthActions.SignupStart({ email, password }));
    }

    form.reset();
  }

  onClose(): void {
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
