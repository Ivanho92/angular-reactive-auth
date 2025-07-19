import { inject, InjectionToken, PLATFORM_ID } from "@angular/core";
import { AuthProviderEnum, environment } from "../../environments/environment";
import { AuthProviderInMemory } from "../auth/auth-provider-in-memory.service";
import { AuthProvider } from "../auth/auth.model";

export const LOCAL_STORAGE = new InjectionToken<Storage>(
  "Window Local Storage Object",
  {
    providedIn: "root",
    factory: () =>
      inject(PLATFORM_ID) === "browser" ? window.localStorage : ({} as Storage),
  },
);

export const AUTH_PROVIDER = new InjectionToken<AuthProvider>(
  "Authentication Provider",
  {
    providedIn: "root",
    factory: () => {
      if (environment.authProvider === AuthProviderEnum.InMemory) {
        return new AuthProviderInMemory();
      }

      return new AuthProviderInMemory();
    },
  },
);
