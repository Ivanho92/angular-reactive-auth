import { computed, Injectable, signal } from "@angular/core";
import { connect } from "ngxtension/connect";
import { Subject } from "rxjs";
import { AuthProvider, AuthUser } from "./auth.model";

interface AuthState {
  user: AuthUser | null;
}

@Injectable({ providedIn: 'root' })
export class AuthProviderInMemory implements AuthProvider {

  // Sources
  user$ = new Subject<AuthUser | null>();

  // State
  private readonly state = signal<AuthState>({
    user: null
  });

  // Selectors
  user = computed(() => this.state().user);

  constructor() {
    // Reducers
    connect(this.state)
      .with(this.user$, (state, user) => ({ ...state, user }));
  }

  // Methods
  async login(email: string, _password: string) {
    this.user$.next({
      id: '0',
      displayName: 'John Doe',
      email,
    });
  }

  async logout() {
    this.user$.next(null);
  }
}