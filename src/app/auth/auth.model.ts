import { JwtPayload } from "jwt-decode";
import { Observable } from "rxjs";

export type UserRole = "manager" | "admin";

export interface AuthProvider {
  token$: Observable<string | null>;
  login(email: string, _password: string): Promise<string>;
  logout(): Promise<void>;
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
  readonly displayName: string;
  readonly email: string;
}
