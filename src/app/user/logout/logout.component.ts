import { Component, inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-logout",
  template: ` <p>logout works!</p> `,
  styles: ``,
  standalone: true,
})
export class LogoutComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  ngOnInit() {
    this.authService.logout();
    void this.router.navigate(["/"]);
  }
}
