import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError } from "rxjs/internal/operators/catchError";
import { switchMap, map, tap } from "rxjs/operators";
import { LocalStorageService } from "src/app/shared/services/local-storage.service";
import { UserModel } from "../models/user.model";
import { AuthApiService } from "../services/auth-api.service";
import { AuthService } from "../services/auth.service";

import * as AuthActions from './auth.actions';
import { handleAuthentication } from "./utils/handle-authentification.util";
import { handleError } from "./utils/handle-error.util";

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.SignupStart) => {
      return this.authApiService.signUp(signupAction.payload.email, signupAction.payload.password).pipe(
        tap((resData) => this.authService.setLogoutTimer(+resData.expiresIn * 1000)),
        map((resData) => handleAuthentication(resData.expiresIn, resData.email, resData.localId, resData.idToken)),
        catchError((errorRes) => handleError(errorRes)),
      );
    }),
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.authApiService.login(authData.payload.email, authData.payload.password).pipe(
        tap((resData) => this.authService.setLogoutTimer(+resData.expiresIn * 1000)),
        map((resData) => handleAuthentication(resData.expiresIn, resData.email, resData.localId, resData.idToken)),
        catchError((errorRes) => handleError(errorRes)),
      );
    }),
  );

  @Effect({
    dispatch: false,
  })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap(() => this.router.navigate(['/'])),
  );

  @Effect({
    dispatch: false,
  })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => this.router.navigate(['/auth'])),
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: { email: string, id: string, _token: string, _tokenExpDate: string } | null = this.localStorageService.getJSONItem('userData');

      if (!userData) {
        return { type: 'DUMMY ' };
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
        this.authService.setLogoutTimer(expirationDuration);
        return new AuthActions.AuthenticateSuccess({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpDate),
        });
        // this.autoLogout(expirationDuration);
      }

      return { type: 'DUMMY ' };
    }),
  );

  @Effect({
    dispatch: false,
  })
  autoLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authService.clearLogoutTimer();
      this.localStorageService.removeItem('userData');
    }),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
    private readonly authApiService: AuthApiService,
    private readonly authService: AuthService,
    private readonly localStorageService: LocalStorageService,
  ) { }
}
