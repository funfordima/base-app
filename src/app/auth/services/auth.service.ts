import { Injectable } from '@angular/core';

import type * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenExpirationTimer?: ReturnType<typeof setTimeout>;

  constructor(
    private readonly store: Store<fromApp.AppState>,
  ) { }

  setLogoutTimer(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => this.store.dispatch(new AuthActions.Logout()), expirationDuration);
  }

  clearLogoutTimer(): void {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}
