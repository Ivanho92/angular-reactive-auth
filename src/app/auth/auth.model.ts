import { Signal } from "@angular/core";
import { JwtPayload } from "jwt-decode";
import { Subject } from "rxjs";

export type UserRole = "manager" | "admin";

export interface AuthProvider {
  login$: Subject<Credentials>;
  logout$: Subject<null>;
  token: Signal<string | null>;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface AuthPayload extends JwtPayload {
  _userId: string;
  _userRoles: UserRole[];
}

export interface User {
  readonly _id: string;
  readonly _roles: UserRole[];
  readonly displayName: string;
  readonly email: string;
}
