import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { ToastService } from "../common/toast.service";
import { AuthService } from "./auth.service";

export const authInterceptor = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const toastService = inject(ToastService);
  const authService = inject(AuthService);
  const router = inject(Router);

  if (request.url.startsWith(environment.baseUrl)) {
    return next(request);
  }

  const jwt = authService.getToken();

  if (jwt === null) {
    return next(request);
  }

  const requestWithToken = request.clone({
    setHeaders: {
      authorization: `Bearer ${jwt}`,
    },
  });

  return next(requestWithToken).pipe(
    catchError((error: HttpErrorResponse) => {
      toastService.openSnackBar(error.error.message);
      if (error.status === 401) {
        void router.navigate(["/"], {
          queryParams: {
            redirectUrl: router.routerState.snapshot.url,
          },
        });
      }
      return throwError(() => error);
    }),
  );
};
