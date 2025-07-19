import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { FlexModule } from "@ngbracket/ngx-layout/flex";
import { LoginService } from "../auth/login.service";

@Component({
  selector: "app-home",
  styles: `
    div[fxLayout] {
      margin-top: 32px;
    }
  `,
  template: `
    <div fxLayout="column" fxLayoutAlign="center center">
      <span class="mat-headline-3">Hello, Limoncu!</span>
      <button
        (click)="loginService.login$.next({ email: 'test@test.com', password: 'test' })"
        mat-raised-button
        color="primary"
        routerLink="/manager"
      >
        Login as Manager
      </button>
    </div>
  `,
  standalone: true,
  imports: [FlexModule, MatButtonModule, RouterLink],
  providers: [LoginService],
})
export class HomeComponent {
  protected readonly loginService = inject(LoginService);
}
