import { InjectionToken } from '@angular/core';
import { AuthProvider, environment } from "../../environments/environment";
import { AuthProviderInMemory } from "../auth/auth.provider.in-memory";

export const AUTH_PROVIDER = new InjectionToken('Authentication Provider', {
  providedIn: 'root',
  factory: () => {

    if (environment.authProvider === AuthProvider.InMemory) {
      return new AuthProviderInMemory();
    }

    return new AuthProviderInMemory();

    // const app = initializeApp(environment.firebase);
    // const auth = getAuth(app);
    // if (environment.useEmulators) {
    //   connectAuthEmulator(auth, 'http://localhost:9099', {
    //     disableWarnings: true,
    //   });
    // }

    // const user: AuthUser = {
    //   user: {
    //     uid: '0',
    //     displayName: 'John Doe',
    //     email: "john.doe@email.com"
    //   },
    //   metadata: {
    //     createdAt: new Date().toLocaleDateString(),
    //     lastSignInTime: new Date().toLocaleDateString()
    //   },
    //
    //   delete(): Promise<void> {
    //     return Promise.resolve(undefined);
    //   },
    //
    //   getToken(): Promise<string> {
    //     return Promise.resolve("");
    //   },
    //
    //   refreshToken(): Promise<void> {
    //     return Promise.resolve(undefined);
    //   },
    //
    //
    //
    // }
    //
    // return auth;
  },
});
