import { Injectable } from "@angular/core";
import type { Resolve } from '@angular/router';
import type { Observable} from 'rxjs';
import { of } from 'rxjs';

import type { Recipe } from '../../models/recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(private readonly recipeService: RecipeService) { }

  resolve(): Observable<Recipe[]> {
    const recipes = this.recipeService.getRecipes();

    if (recipes.length) {
      return of(recipes);
    }
    return this.recipeService.fetchRecipes();
  }
}
