import { Injectable } from "@angular/core";
import type { Observable } from "rxjs";
import { Subject } from "rxjs";
import { map, tap } from "rxjs/operators";

import * as ShoppingListActions from '../../../shopping-list/store/shopping-list.actions';
import type * as fromApp from '../../../store/app.reducer';
import type { Recipe } from "../../models/recipe.model";
import { Store } from "@ngrx/store";
import type { IngredientModel } from "src/app/shared/models/ingredient.model";
import { DataStorageApiService } from "src/app/shared/services/data-storage-api.service";

@Injectable()
export class RecipeService {
  recipeList$?: Observable<Recipe[]>;

  private recipes: Recipe[] = [];
  private recipeChanged = new Subject<Recipe[]>();

  constructor(
    private readonly dataStorageApiService: DataStorageApiService,
    private readonly store: Store<fromApp.AppState>,
  ) {
    this.recipeList$ = this.recipeChanged.asObservable();
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: IngredientModel[]): void {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe): void {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.dataStorageApiService.fetchRecipes().pipe(
      map((recipes) => recipes.map((recipe) => ({
        ...recipe,
        ingredients: recipe?.ingredients ?? [],
      }))),
      tap((recipes) => this.setRecipes(recipes)),
    );
  }
}
