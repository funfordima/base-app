import { UserModel } from '../../models/user.model';
import * as AuthActions from '../auth.actions';

export const handleAuthentication = (expiresIn: string, email: string, userId: string, token: string): AuthActions.AuthenticateSuccess => {
  const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);

  const newUser = new UserModel(
    email,
    userId,
    token,
    expirationDate,
  );

  localStorage.setItem('userData', JSON.stringify(newUser));

  return new AuthActions.AuthenticateSuccess({
    email,
    userId,
    token,
    expirationDate,
  });
};
