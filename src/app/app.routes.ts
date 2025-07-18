import { Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  {
    path: "manager",
    loadChildren: () => import("./manager/manager.routes"),
  },
  {
    path: "user",
    loadChildren: () => import("./user/user.module"),
  },
  {
    path: "pos",
    loadChildren: () => import("./pos/pos.module"),
  },
  {
    path: "inventory",
    loadChildren: () => import("./inventory/inventory.routes"),
  },
  {
    path: "**",
    loadComponent: () => import("./page-not-found/page-not-found.component"),
  },
];
