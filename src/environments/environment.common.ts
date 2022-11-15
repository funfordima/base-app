import { ApiKeyEnum } from './constants/api-key.enum';
import type { EnvironmentSettings } from './environment-settings';

export const environmentCommon: EnvironmentSettings = {
  production: true,
  api: {
    fireBaseUrl: 'https://ng-recipe-book-1756-default-rtdb.europe-west1.firebasedatabase.app/',
    authUrl: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ApiKeyEnum.AuthKey}`,
    loginUrl: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ApiKeyEnum.AuthKey}`,
  },
};
