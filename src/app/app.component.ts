import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { DomSanitizer } from "@angular/platform-browser";
import { RouterOutlet } from "@angular/router";
import { FlexModule } from "@ngbracket/ngx-layout/flex";
import { AuthService } from "./auth/auth.service";
import { HeaderComponent } from "./common/header.component";
import { UserService } from "./user/user.service";

@Component({
  selector: "app-root",
  template: `
    <app-header
      [isAuthenticated]="authService.isAuthenticated()"
      [displayName]="userService.user()?.displayName ?? ''"
    />
    <router-outlet />
  `,
  styles: ``,
  imports: [
    FlexModule,
    HeaderComponent,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    RouterOutlet,
  ]
})
export class AppComponent {
  protected readonly userService = inject(UserService);
  protected readonly authService = inject(AuthService);

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      "lemon",
      sanitizer.bypassSecurityTrustResourceUrl("assets/icons/lemon.svg"),
    );
  }
}
