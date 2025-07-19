import { computed, inject, Injectable, signal } from "@angular/core";
import { connect } from "ngxtension/connect";
import { map, Subject } from "rxjs";
import { Credentials } from "./auth.model";
import { AuthService } from "./auth.service";

export type LoginStatus = "pending" | "authenticating" | "success" | "error";

interface LoginState {
  status: LoginStatus;
}

@Injectable()
export class LoginService {
  private readonly authService = inject(AuthService);

  // sources
  error$ = new Subject<any>();
  login$ = new Subject<Credentials>();

  userAuthenticated$ = this.login$.pipe(
    map((credentials) =>
      this.authService.login(credentials.email, credentials.password),
    ),
  );

  // state
  private readonly state = signal<LoginState>({
    status: "pending",
  });

  // selectors
  status = computed(() => this.state().status);

  constructor() {
    // reducers
    connect(this.state)
      .with(this.userAuthenticated$, () => ({ status: "success" }))
      .with(this.login$, () => ({ status: "authenticating" }))
      .with(this.error$, () => ({ status: "error" }));
  }
}
