import { inject } from "@angular/core";
import { CanMatchFn, UrlSegment } from "@angular/router";
import { AuthService } from "../auth.service";
import { canMatchGuard } from "./can-match";

export const isManagerGuard: CanMatchFn = (_, segments: UrlSegment[]) => {
  const authService = inject(AuthService);
  return canMatchGuard(() => authService.hasRole("manager"), segments);
};
