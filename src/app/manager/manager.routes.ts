import { Route } from "@angular/router";

import { ManagerComponent } from "./manager.component";
import { ManagerHomeComponent } from "./manager-home/manager-home.component";
import { ReceiptLookupComponent } from "./receipt-lookup/receipt-lookup.component";
import { UserManagementComponent } from "./user-management/user-management.component";

export default [
  {
    path: "",
    component: ManagerComponent,
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", component: ManagerHomeComponent },
      { path: "users", component: UserManagementComponent },
      { path: "receipts", component: ReceiptLookupComponent },
    ],
  },
] satisfies Route[];
