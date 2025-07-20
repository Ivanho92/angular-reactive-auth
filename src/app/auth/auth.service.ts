import { computed, inject, Injectable, signal } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { jwtDecode } from "jwt-decode";
import { connect } from "ngxtension/connect";
import { from } from "rxjs";
import { AUTH_PROVIDER } from "../common/injection-tokens";
import { UserRole } from "../user/user.model";
import { AuthPayload } from "./auth.model";

interface AuthState {
  userId: string | null;
  userRoles: UserRole[];
}

const DEFAULT_STATE = {
  userId: null,
  userRoles: [],
} satisfies AuthState;

@Injectable({ providedIn: "root" })
export class AuthService {
  private readonly authProvider = inject(AUTH_PROVIDER);

  // sources
  private readonly token$ = toObservable(this.authProvider.token);

  // state
  private readonly state = signal<AuthState>(DEFAULT_STATE);

  // selectors
  isAuthenticated = computed(() => !!this.state().userId);
  userId = computed(() => this.state().userId);
  userRoles = computed(() => this.state().userRoles);

  constructor() {
    connect(this.state).with(this.token$, (_, token) =>
      this.decodeToken(token),
    );
  }

  login(email: string, password: string) {
    return from(this.authProvider.login(email, password));
  }

  logout() {
    void this.authProvider.logout();
  }

  hasRole(role: UserRole) {
    return this.userRoles().includes(role);
  }

  decodeToken(token: string | null) {
    if (!token) return DEFAULT_STATE;

    try {
      const payload = jwtDecode<AuthPayload>(token);
      return {
        userId: payload._userId,
        userRoles: payload._userRoles,
      };
    } catch (error) {
      console.error("Invalid token:", error);
      return DEFAULT_STATE;
    }
  }

  register(email: string, password: string) {
    throw new Error("Method not implemented");
  }
}
