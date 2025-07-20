import { inject } from "@angular/core";
import { Router, UrlSegment } from "@angular/router";
import { ToastService } from "../../common/toast.service";
import { AuthService } from "../auth.service";

export const canMatchGuard = (
  predicate: () => boolean,
  segments: UrlSegment[],
  errorMessage?: string,
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(ToastService);

  const url = segments.map((s) => s.path).join("/");

  if (predicate()) return true;

  if (errorMessage) toastService.openSnackBar(errorMessage);

  authService.logout();
  return router.createUrlTree(["/"], { queryParams: { redirectUrl: url } });
};
