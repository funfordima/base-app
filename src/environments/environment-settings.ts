export interface EnvironmentSettings {
  production: boolean;
  api: {
    fireBaseUrl: string;
    authUrl: string;
  };
}
