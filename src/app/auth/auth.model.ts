// export declare interface AuthUser {
//   readonly user: UserInfo;
//   readonly metadata: UserMetadata;
//
//   getToken(): Promise<string>;
//   refreshToken(): Promise<void>;
//   delete(): Promise<void>;
// }

export declare interface AuthUser {
  readonly id: string;
  readonly displayName: string | null;
  readonly email: string | null;
  readonly metadata?: UserMetadata;
}

export declare interface UserMetadata {
  readonly createdAt?: string;
  readonly lastSignInTime?: string;
}

export interface AuthProvider {
  login(email: string, _password: string): Promise<void>;
  logout(): Promise<void>;
}

export interface Credentials {
  email: string,
  password: string
}