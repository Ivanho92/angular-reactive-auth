import { Component, effect, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { Router } from "@angular/router";
import { FlexModule } from "@ngbracket/ngx-layout/flex";
import { AuthService } from "../auth/auth.service";
import { LoginService } from "../auth/login.service";

@Component({
  selector: "app-home",
  styles: `
    div[fxLayout] {
      margin-top: 32px;
    }
  `,
  template: `
    @if (!this.authService.isAuthenticated()) {
      <div fxLayout="column" fxLayoutAlign="center center">
        <span class="mat-headline-3">Hello, Limoncu!</span>
        <!--        (click)="loginService.login$.next({ email: 'test@test.com', password: 'test' })"-->
        <button
          (click)="authService.login('john.doe@manager.com', 'password')"
          mat-raised-button
          color="primary"
        >
          Login as Manager
        </button>
      </div>
    } @else {
      <mat-spinner />
    }
  `,
  imports: [FlexModule, MatButtonModule, MatProgressSpinner],
  providers: [LoginService],
})
export class HomeComponent {
  // protected readonly loginService = inject(LoginService);
  protected readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  constructor() {
    effect(() => {
      if (this.authService.isAuthenticated()) {
        void this.router.navigate(["manager"]);
      }
    });
  }
}
