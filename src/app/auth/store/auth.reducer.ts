import { UserModel } from "../models/user.model";
import * as AuthActions from './auth.actions';

export interface State {
  user: UserModel | null;
}

const initialState: State = {
  user: null,
};

export function AuthReducer(state = initialState, action: AuthActions.AuthActions): State {
  switch (action.type) {
    case AuthActions.LOGIN: {
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
      };
    }

    case AuthActions.LOGOUT: {
      return {
        ...state,
        user: null,
      };
    }

    default: {
      return { ...state };
    }
  }
}
