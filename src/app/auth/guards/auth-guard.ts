import { inject } from "@angular/core";
import { CanMatchFn, UrlSegment } from "@angular/router";
import { AuthService } from "../auth.service";
import { canMatchGuard } from "./can-match";

export const isAuthenticatedGuard: CanMatchFn = (_, segments: UrlSegment[]) => {
  const authService = inject(AuthService);
  return canMatchGuard(() => authService.isAuthenticated(), segments, 'You have been logged out.');
};
