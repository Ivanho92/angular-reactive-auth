import { Injectable } from "@angular/core";
import { sign } from "fake-jwt-sign";
import { Subject } from "rxjs";
import { AuthProvider } from "./auth.model";

@Injectable({ providedIn: "root" })
export class AuthProviderInMemory implements AuthProvider {
  private readonly _token$ = new Subject<string | null>();
  readonly token$ = this._token$.asObservable();

  async login(email: string, _password: string) {
    if (!email.toLowerCase().endsWith("@test.com")) {
      throw new Error("Invalid email.");
    }

    const authPayload = {
      _userId: this.defaultUser._id,
      _userRoles: this.defaultUser._roles,
    };

    const accessToken = sign(authPayload, "secret", {
      expiresIn: "1h",
      algorithm: "none",
    });

    this._token$.next(accessToken);
    return accessToken;
  }

  async logout() {
    this._token$.next(null);
  }

  private readonly defaultUser = {
    _id: "5da01751da27cc462d265913",
    _roles: ["manager"],
    displayName: "John Doe",
    email: "john.doe@email.com",
  };
}
