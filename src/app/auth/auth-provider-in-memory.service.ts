import { computed, Injectable, signal } from "@angular/core";
import { sign } from "fake-jwt-sign";
import { connect } from "ngxtension/connect";
import { map, merge, Subject } from "rxjs";
import { AuthProvider, Credentials } from "./auth.model";

interface AuthInMemoryState {
  token: string | null;
}

@Injectable({ providedIn: "root" })
export class AuthProviderInMemory implements AuthProvider {
  // sources
  readonly login$ = new Subject<Credentials>();
  readonly logout$ = new Subject<null>();

  private readonly token$ = merge(
    this.logout$,
    this.login$.pipe(map(({ email, password }) => this.login(email, password))),
  );

  // state
  private readonly state = signal<AuthInMemoryState>({
    token: null,
  });

  // selectors
  token = computed(() => this.state().token);

  constructor() {
    connect(this.state).with(this.token$, (state, token) => ({
      ...state,
      token,
    }));
  }

  private login(email: string, _password: string) {
    if (!email.toLowerCase().endsWith("@test.com")) {
      throw new Error("Invalid email.");
    }

    const authPayload = {
      _userId: this.defaultUser._id,
      _userRoles: this.defaultUser._roles,
    };

    return sign(authPayload, "secret", {
      expiresIn: "1h",
      algorithm: "none",
    });
  }

  private readonly defaultUser = {
    _id: "5da01751da27cc462d265913",
    _roles: ["manager"],
    displayName: "John Doe",
    email: "john.doe@email.com",
  };
}
