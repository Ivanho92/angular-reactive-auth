import { computed, inject, Injectable, signal } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { connect } from "ngxtension/connect";
import { defer, from } from "rxjs";
import { AUTH_PROVIDER } from "../common/injection-tokens";
import { AuthUser } from "./auth.model";

interface AuthState {
  user: AuthUser | null | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authProvider = inject(AUTH_PROVIDER);

  // sources
  private readonly user$ = toObservable(this.authProvider.user);

  // state
  readonly state = signal<AuthState>({
    user: undefined,
  });

  // selectors
  user = computed(() => this.state().user);

  constructor() {
    // reducers
    connect(this.state)
      .with(this.user$, (state, user) => ({ ...state, user }));
  }

  login(email: string, password: string) {
    return from(
      defer(() =>
        this.authProvider.login(email, password)
      ),
    );
  }

  logout() {
    void this.authProvider.logout();
  }

  register(email: string, password: string) {
    throw new Error("Method not implemented");
    // return from(
    //   defer(() =>
    //     createUserWithEmailAndPassword(
    //       this.auth,
    //       credentials.email,
    //       credentials.password,
    //     ),
    //   ),
    // );
  }
}
