import { Component, input } from "@angular/core";
import { MatButton, MatMiniFabButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatToolbar } from "@angular/material/toolbar";
import { MatTooltip } from "@angular/material/tooltip";
import { RouterLink } from "@angular/router";
import { DefaultLayoutGapDirective } from "@ngbracket/ngx-layout";

@Component({
  selector: "app-header",
  imports: [
    DefaultLayoutGapDirective,
    MatButton,
    MatIcon,
    MatMiniFabButton,
    MatToolbar,
    MatTooltip,
    RouterLink,
  ],
  template: `
    <div class="dark-theme">
      <mat-toolbar color="primary" fxLayoutGap="8px">
        <!--        <button mat-icon-button><mat-icon>menu</mat-icon></button>-->
        <a matButton routerLink="/home" data-testid="title">
          <mat-icon svgIcon="lemon" />
          LemonMart
        </a>

        <span class="flex-spacer"></span>
        
        @if(isAuthenticated()) {
          <span>Welcome, {{ displayName() }} !</span>
        }
        <button
          matMiniFab
          routerLink="/user/profile"
          matTooltip="Profile"
          aria-label="User Profile"
        >
          <mat-icon>account_circle</mat-icon>
        </button>
        <button
          matMiniFab
          routerLink="/user/logout"
          matTooltip="Logout"
          aria-label="Logout"
        >
          <mat-icon>logout</mat-icon>
        </button>
      </mat-toolbar>
    </div>
  `,
})
export class HeaderComponent {
  isAuthenticated = input.required<boolean>();
  displayName = input.required<string>();
}
