import { UserModel } from "../models/user.model";
import * as AuthActions from './auth.actions';

export interface State {
  user: UserModel | null;
  authError: string | null;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

export function AuthReducer(state = initialState, action: AuthActions.AuthActions): State {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS: {
      const expirationDate = new Date(new Date().getTime() + +action.payload.expirationDate * 1000);
      const user = new UserModel(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        expirationDate,
      );

      return {
        ...state,
        user,
        authError: null,
        loading: false,
      };
    }

    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START: {
      return {
        ...state,
        authError: null,
        loading: true,
      };
    }

    case AuthActions.AUTHENTICATE_FAIL: {
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false,
      };
    }

    case AuthActions.LOGOUT: {
      return {
        ...state,
        user: null,
      };
    }

    case AuthActions.CLEAR_ERROR: {
      return {
        ...state,
        authError: null,
      };
    }

    default: {
      return { ...state };
    }
  }
}
