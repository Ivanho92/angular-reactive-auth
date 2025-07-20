export type UserRole = "manager" | "admin";

export interface User {
  readonly _id: string;
  readonly _roles: UserRole[];
  readonly displayName: string;
  readonly email: string;
}
