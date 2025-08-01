import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { LogoutComponent } from "./logout/logout.component";
import { NavigationMenuComponent } from "./navigation-menu/navigation-menu.component";
import { ProfileComponent } from "./profile/profile.component";
import { UserRoutingModule } from "./user-routing.module";

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    ProfileComponent,
    LogoutComponent,
    NavigationMenuComponent,
  ],
})
export default class UserModule {}
