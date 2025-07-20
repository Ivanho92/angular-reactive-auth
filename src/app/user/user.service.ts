import { computed, inject, Injectable, signal } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { connect } from "ngxtension/connect";
import { of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { User } from "../auth/auth.model";
import { AuthService } from "../auth/auth.service";
import { IN_MEMORY_USERS } from "../auth/in-memory-users";

interface UserState {
  user: User | null;
}

@Injectable({ providedIn: "root" })
export class UserService {
  private readonly auth = inject(AuthService);

  // State
  public readonly state = signal<UserState>({
    user: null,
  });

  // Selectors
  user = computed(() => this.state().user);

  // Sources
  authChanged$ = toObservable(this.auth.userId).pipe(
    switchMap(this.fetchUserById),
  );

  constructor() {
    // Reducers
    connect(this.state).with(this.authChanged$, (state, user) => ({
      ...state,
      user,
    }));
  }

  private fetchUserById(userId: string | null) {
    if (!userId) return of(null);
    return of(IN_MEMORY_USERS.find(user => user._id === userId)! as User);
  }
}
