import { NgModule } from "@angular/core";
import type {Routes } from "@angular/router";
import { RouterModule } from "@angular/router";

import { AuthGuard } from "../auth/guards/auth.guard";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-list/recipe-edit/recipe-edit.component";
import { RecipeEmptyComponent } from "./recipe-list/recipe-empty/recipe-empty.component";
import { RecipeResolverService } from "./recipe-list/services/recipe-resolver.service";
import { RecipesComponent } from "./recipes.component";

const routes: Routes = [
  {
    path: '', component: RecipesComponent, children: [
      { path: '', component: RecipeEmptyComponent, pathMatch: 'full' },
      { path: 'new', component: RecipeEditComponent, resolve: [RecipeResolverService] },
      { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService] },
      { path: ':id/edit', component: RecipeEditComponent },
    ],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule { }
