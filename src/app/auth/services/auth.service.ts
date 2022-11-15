import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared/notification-service';

import { AuthResponse } from '../models/auth-response.interface';
import { UserModel } from '../models/user.model';
import { getCustomServerErrorText } from '../utils/server-error.utils';
import { AuthApiService } from './auth-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<UserModel | null>;

  private userSubject = new BehaviorSubject<UserModel | null>(null);

  constructor(
    private readonly authApiService: AuthApiService,
    private readonly notificationService: NotificationService,
    private readonly router: Router,
  ) {
    this.user$ = this.userSubject.asObservable();
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
    this.userSubject.next(null);
    this.router.navigate(['/auth']);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: string): void {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const newUser = new UserModel(
      email,
      userId,
      token,
      expirationDate,
    );

    this.userSubject.next(newUser);
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
