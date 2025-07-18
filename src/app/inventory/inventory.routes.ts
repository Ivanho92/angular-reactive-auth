import { Route } from "@angular/router";

import { CategoriesComponent } from "./categories/categories.component";
import { InventoryComponent } from "./inventory.component";
import { InventoryHomeComponent } from "./inventory-home/inventory-home.component";
import { ProductsComponent } from "./products/products.component";
import { StockEntryComponent } from "./stock-entry/stock-entry.component";

export default [
  {
    path: "",
    component: InventoryComponent,
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", component: InventoryHomeComponent },
      { path: "stock-entry", component: StockEntryComponent },
      { path: "products", component: ProductsComponent },
      { path: "categories", component: CategoriesComponent },
    ],
  },
] satisfies Route[];
