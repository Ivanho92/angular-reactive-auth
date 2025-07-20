import { Signal } from "@angular/core";
import { JwtPayload } from "jwt-decode";
import { UserRole } from "../user/user.model";

export type AuthCredentials = [email: string, password: string];

export interface AuthProvider {
  login(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
  token: Signal<string | null>;
}

export interface AuthPayload extends JwtPayload {
  _userId: string;
  _userRoles: UserRole[];
}
