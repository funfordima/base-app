import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared/notification-service';

import { AuthResponse } from '../models/auth-response.interface';
import { getCustomServerErrorText } from '../utils/server-error.utils';
import { AuthApiService } from './auth-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private readonly authApiService: AuthApiService,
    private readonly notificationService: NotificationService,
  ) { }

  signUp(email: string, password: string): Observable<AuthResponse | HttpErrorResponse> {
    return this.authApiService.signUp(email, password).pipe(
      catchError((err) => {
        const error = getCustomServerErrorText(err);
        if (error) {
          this.notificationService.showErrorMessage({ errorCode: '404', errorMessage: error.error.errors?.[0] });

          // return of(error);
        }

        return throwError(err);
      }),
    );
  }
}
