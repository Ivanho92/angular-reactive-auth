import { AuthProviderEnum } from "./environment";

export const environment = {
  production: true,
  authProvider: AuthProviderEnum.InMemory,
  baseUrl: 'http://localhost:4200',
};
