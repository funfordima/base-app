import type { HttpErrorResponse } from '@angular/common/http';

import { AuthErrorCodeEnum } from '../constants/auth-error-code.enum';
import { FIREBASE_ERRORS_LABELS } from '../constants/server-errors.constants';
import { FirebaseServerErrorModel } from '../models/firebase-server-error.model';

export const getErrorMessage = (message: AuthErrorCodeEnum): string | undefined =>
  FIREBASE_ERRORS_LABELS[message];

export const getErrorMessageOrGenericByCode = (message: AuthErrorCodeEnum): string =>
  getErrorMessage(message) ?? FIREBASE_ERRORS_LABELS[AuthErrorCodeEnum.SOMETHING_WENT_WRONG];

/**
 * Get label for the error-message component by custom error code
 * @return {string} custom error label.
 * @param inputError - HttpErrorResponse
 */
export const getCustomServerErrorText = (inputError: HttpErrorResponse): HttpErrorResponse => {
  const processedError = { ...inputError };

  processedError.error.error = getErrorMessage(processedError.error?.error.message) || processedError.error?.error?.message;

  return processedError;
};
