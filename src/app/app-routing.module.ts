import { RecipeResolverService } from './recipes/recipe-list/services/recipe-resolver.service';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-list/recipe-edit/recipe-edit.component";
import { RecipeEmptyComponent } from "./recipes/recipe-list/recipe-empty/recipe-empty.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/guards/auth.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes', component: RecipesComponent, children: [
      { path: '', component: RecipeEmptyComponent, pathMatch: 'full' },
      { path: 'new', component: RecipeEditComponent, resolve: [RecipeResolverService] },
      { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService] },
      { path: ':id/edit', component: RecipeEditComponent },
    ],
    canActivate: [AuthGuard],
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
