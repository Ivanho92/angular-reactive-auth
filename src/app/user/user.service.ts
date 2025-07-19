import { computed, inject, Injectable, signal } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { connect } from "ngxtension/connect";
import { of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { User } from "../auth/auth.model";
import { AuthService } from "../auth/auth.service";

interface UserState {
  user: User | null;
}

@Injectable({ providedIn: "root" })
export class UserService {
  private readonly auth = inject(AuthService);

  // State
  private readonly state = signal<UserState>({
    user: null,
  });

  // Selectors
  user = computed(() => this.state().user);

  // Sources
  authChanged$ = toObservable(this.auth.userId).pipe(
    switchMap(this.getUserById),
  );

  constructor() {
    // Reducers
    connect(this.state).with(this.authChanged$, (state, user) => ({
      ...state,
      user,
    }));
  }

  private getUserById(userId: string | null) {
    if (!userId) return of(null);
    return of({
      _userId: userId,
      _userRoles: ["manager"],
      displayName: "John Doe",
      email: "john.doe@email.com",
    } as User);
  }
}
