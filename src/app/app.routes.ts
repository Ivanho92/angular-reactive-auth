import { Routes } from "@angular/router";
import { isAuthenticatedGuard } from "./auth/guards/auth-guard";
import { isManagerGuard } from "./auth/guards/manager-guard";
import { HomeComponent } from "./home/home.component";

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  {
    path: "user",
    canMatch: [isAuthenticatedGuard],
    loadChildren: () => import("./user/user.module"),
  },
  {
    path: "manager",
    canMatch: [isAuthenticatedGuard, isManagerGuard],
    loadChildren: () => import("./manager/manager.routes"),
  },
  {
    path: "pos",
    canMatch: [isAuthenticatedGuard],
    loadChildren: () => import("./pos/pos.module"),
  },
  {
    path: "inventory",
    canMatch: [isAuthenticatedGuard],
    loadChildren: () => import("./inventory/inventory.routes"),
  },
  {
    path: "**",
    loadComponent: () => import("./page-not-found/page-not-found.component"),
  },
];
