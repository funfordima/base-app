import { Observable, of } from "rxjs";

import * as AuthActions from '../auth.actions';

export const handleError = (errorRes: any): Observable<AuthActions.AuthenticateFail> => {
  let errorMsg = 'An error occurred';

  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMsg));
  }

  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS': {
      errorMsg = 'This email exists already!';
      break;
    }

    case 'EMAIL_NOT_FOUND': {
      errorMsg = 'This email does not exist!';
      break;
    }

    case 'INVALID_PASSWORD': {
      errorMsg = 'This password is not correct!';
      break;
    }
  }

  return of(new AuthActions.AuthenticateFail(errorMsg));
};
