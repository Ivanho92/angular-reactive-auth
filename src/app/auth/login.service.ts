import { computed, inject, Injectable, signal } from "@angular/core";
import { connect } from "ngxtension/connect";
import { EMPTY, Subject } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { ToastService } from "../common/toast.service";
import { AuthCredentials } from "./auth.model";
import { AuthService } from "./auth.service";

export type LoginStatus = "pending" | "authenticating" | "success" | "error";

interface LoginState {
  status: LoginStatus;
}

@Injectable()
export class LoginService {
  private readonly authService = inject(AuthService);
  private readonly toastService = inject(ToastService);

  // sources
  error$ = new Subject<unknown>();
  login$ = new Subject<AuthCredentials>();

  authenticated$ = this.login$.pipe(
    switchMap(([email, password]) =>
      this.authService.login(email, password).pipe(
        catchError((error) => {
          this.error$.next(error);
          return EMPTY;
        }),
      ),
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
      .with(this.authenticated$, () => ({ status: "success" }))
      .with(this.login$, () => ({ status: "authenticating" }))
      .with(this.error$, (_, error) => {
        this.toastService.openSnackBar((error as Error).message);
        return { status: "error" };
      });
  }
}
