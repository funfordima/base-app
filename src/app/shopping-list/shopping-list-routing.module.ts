import { NgModule } from "@angular/core";
import type { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";

import { ShoppingListComponent } from "./shopping-list.component";

const routes: Routes = [
  { path: '', component: ShoppingListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingListRoutingModule { }
