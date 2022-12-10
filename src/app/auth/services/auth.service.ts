import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { NotificationService } from 'src/app/shared/notification-service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { AuthResponse } from '../models/auth-response.interface';
import { UserModel } from '../models/user.model';
import { getCustomServerErrorText } from '../utils/server-error.utils';
import { AuthApiService } from './auth-api.service';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // user$: Observable<UserModel | null>;

  private tokenExpirationTimer?: ReturnType<typeof setTimeout>;
  private userSubject = new BehaviorSubject<UserModel | null>(null);

  constructor(
    private readonly authApiService: AuthApiService,
    private readonly notificationService: NotificationService,
    private readonly localStorageService: LocalStorageService,
    private readonly router: Router,
    private readonly store: Store<fromApp.AppState>,
  ) {
    // this.user$ = this.userSubject.asObservable();
  }

  getUserData(): UserModel | null {
    return this.userSubject.getValue();
  }

  signUp(email: string, password: string): Observable<AuthResponse | HttpErrorResponse> {
    return this.authApiService.signUp(email, password).pipe(
      tap((userData) => this.handleAuthentication(
        userData.email,
        userData.localId,
        userData.idToken,
        userData.expiresIn
      )),
      catchError(this.handleError),
    )
  }

  login(email: string, password: string): Observable<AuthResponse | HttpErrorResponse> {
    return this.authApiService.login(email, password).pipe(
      tap((userData) => this.handleAuthentication(
        userData.email,
        userData.localId,
        userData.idToken,
        userData.expiresIn
      )),
      catchError(this.handleError),
    );
  }

  logout(): void {
    // this.userSubject.next(null);
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/auth']);
    this.localStorageService.removeItem('userData');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = undefined;
  }

  autoLogin(): void {
    const userData: { email: string, id: string, _token: string, _tokenExpDate: string } | null = this.localStorageService.getJSONItem('userData');

    if (!userData) {
      return;
    }

    const loadedUser = new UserModel(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpDate),
    );
    const expirationDuration = new Date(userData._tokenExpDate).getTime() - new Date().getTime();

    if (loadedUser.token) {
      // this.userSubject.next(loadedUser);
      this.store.dispatch(new AuthActions.Login({
        email: loadedUser.email,
        userId: loadedUser.id,
        token: loadedUser.token,
        expirationDate: new Date(userData._tokenExpDate),
      }));
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => this.logout(), expirationDuration);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: string): void {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const newUser = new UserModel(
      email,
      userId,
      token,
      expirationDate,
    );

    this.localStorageService.setJSONItem('userData', newUser);
    // this.userSubject.next(newUser);
    this.store.dispatch(new AuthActions.Login({
      email,
      userId,
      token,
      expirationDate,
    }));
    this.autoLogout(+expiresIn * 1000);
  }

  private handleError(err: HttpErrorResponse): Observable<HttpErrorResponse> {
    console.log(err);

    const error = getCustomServerErrorText(err);
    if (error) {
      this.notificationService.showErrorMessage({ errorCode: '404', errorMessage: error?.error?.error?.message });
    }

    return throwError(err);
  }
}
