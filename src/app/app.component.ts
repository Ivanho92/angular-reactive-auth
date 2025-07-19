import { JsonPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltip } from "@angular/material/tooltip";
import { DomSanitizer } from "@angular/platform-browser";
import { RouterLink, RouterOutlet } from "@angular/router";
import { FlexModule } from "@ngbracket/ngx-layout/flex";
import { AuthService } from "./auth/auth.service";

@Component({
  selector: "app-root",
  template: `
    <pre>{{ authService.state() | json }}</pre>
    
    <div class="dark-theme">
      <mat-toolbar color="primary" fxLayoutGap="8px">
<!--        <button mat-icon-button><mat-icon>menu</mat-icon></button>-->
        <a matButton routerLink="/home" data-testid="title">
          <mat-icon svgIcon="lemon" />
          LemonMart
        </a>
        
        <span class="flex-spacer"></span>
        
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
    <router-outlet></router-outlet>
  `,
  styles: ``,
  standalone: true,
  imports: [
    FlexModule,
    RouterLink,
    RouterOutlet,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatTooltip,
    JsonPipe
  ]
})
export class AppComponent {
  protected readonly authService = inject(AuthService);

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      "lemon",
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/lemon.svg"),
    );
  }
}
