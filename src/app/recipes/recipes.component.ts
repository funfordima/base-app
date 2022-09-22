import { Component } from '@angular/core';

import { RecipeService } from './recipe-list/services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService],
})
export class RecipesComponent {
  selectedRecipe$ = this.recipeService.getSelectedRecipe();

  constructor(
    private readonly recipeService: RecipeService,
  ) { }
}
