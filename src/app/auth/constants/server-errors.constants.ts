import { AuthErrorCodeEnum } from "./auth-error-code.enum";

export const FIREBASE_ERRORS_LABELS: Record<AuthErrorCodeEnum, string> = {
  [AuthErrorCodeEnum.EMAIL_EXISTS]: 'Email already exists',
  [AuthErrorCodeEnum.OPERATION_NOT_ALLOWED]: 'Phone or password is incorrect',
  [AuthErrorCodeEnum.TOO_MANY_ATTEMPTS_TRY_LATER]: 'All attempts is used',
  [AuthErrorCodeEnum.SOMETHING_WENT_WRONG]: 'Something went wrong',
  [AuthErrorCodeEnum.EMAIL_NOT_FOUND]: 'Email does not exist',
  [AuthErrorCodeEnum.INVALID_PASSWORD]: 'Password is incorrect',
  [AuthErrorCodeEnum.USER_DISABLED]: 'User temporary blocked',
};
