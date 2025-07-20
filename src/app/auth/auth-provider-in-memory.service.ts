import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { sign } from "fake-jwt-sign";
import { connect } from "ngxtension/connect";
import { Subject } from "rxjs";
import { CacheService } from "../common/cache.service";
import { AuthProvider } from "./auth.model";
import { IN_MEMORY_USERS } from "./in-memory-users";

interface AuthInMemoryState {
  token: string | null;
}

const TOKEN_STORAGE_KEY = "jwt";

@Injectable({ providedIn: "root" })
export class AuthProviderInMemory implements AuthProvider {
  private readonly cache = inject(CacheService);

  // sources
  private readonly token$ = new Subject<string | null>();

  // state
  private readonly state = signal<AuthInMemoryState>({
    token: this.cache.getItem(TOKEN_STORAGE_KEY),
  });

  // selectors
  token = computed(() => this.state().token);

  constructor() {
    // reducers
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

  // interface implementations
  async login(email: string, password: string) {
    const mockUser = this.getMockUser(email, password)!;

    if (!mockUser) {
      throw new Error("Invalid credentials");
    }

    const authPayload = {
      _userId: mockUser._id,
      _userRoles: mockUser._roles,
    };

    const token = sign(authPayload, "secret", {
      expiresIn: "1h",
      algorithm: "none",
    });

    this.token$.next(token);
  }

  async logout() {
    this.token$.next(null);
  }

  // private methods
  private getMockUser(email: string, password: string) {
    return IN_MEMORY_USERS.find(
      (user) => user.email === email && user.password === password,
    );
  }
}
