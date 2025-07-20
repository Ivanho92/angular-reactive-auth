import { inject, Injectable } from "@angular/core";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  private readonly snackBar = inject(MatSnackBar);

  verticalPosition: MatSnackBarVerticalPosition = "top";
  horizontalPosition: MatSnackBarHorizontalPosition = "end";

  openSnackBar(message: string, action = "Close") {
    this.snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
