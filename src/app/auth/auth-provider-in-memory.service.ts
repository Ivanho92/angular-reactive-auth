import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { sign } from "fake-jwt-sign";
import { connect } from "ngxtension/connect";
import { map, merge, Subject } from "rxjs";
import { CacheService } from "../common/cache.service";
import { AuthProvider, Credentials } from "./auth.model";
import { IN_MEMORY_USERS } from "./in-memory-users";

interface AuthInMemoryState {
  token: string | null;
}

const TOKEN_STORAGE_KEY = "jwt";

@Injectable({ providedIn: "root" })
export class AuthProviderInMemory implements AuthProvider {
  private readonly cache = inject(CacheService);

  // sources
  readonly login$ = new Subject<Credentials>();
  readonly logout$ = new Subject<null>();

  private readonly token$ = merge(
    this.logout$,
    this.login$.pipe(map(({ email, password }) => this.login(email, password))),
  );

  // state
  private readonly state = signal<AuthInMemoryState>({
    token: this.cache.getItem(TOKEN_STORAGE_KEY),
  });

  // selectors
  token = computed(() => this.state().token);

  constructor() {
    connect(this.state).with(this.token$, (state, token) => ({
      ...state,
      token,
    }));

    effect(() => {
      const token = this.token();
      token
        ? this.cache.setItem(TOKEN_STORAGE_KEY, token)
        : this.cache.removeItem(TOKEN_STORAGE_KEY);
    });
  }

  private login(email: string, password: string) {
    const mockUser = this.getMockUser(email, password)!;

    if (!mockUser) {
      throw new Error("Invalid credentials");
    }

    const authPayload = {
      _userId: mockUser._id,
      _userRoles: mockUser._roles,
    };

    return sign(authPayload, "secret", {
      expiresIn: "1h",
      algorithm: "none",
    });
  }

  private getMockUser(email: string, password: string) {
    return IN_MEMORY_USERS.find(user => user.email === email && user.password === password)
  }
}
