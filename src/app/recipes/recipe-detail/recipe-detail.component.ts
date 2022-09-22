import { Component, Input } from '@angular/core';

import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../recipe-list/services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  @Input() recipe?: Recipe;

  constructor(
    private readonly recipeService: RecipeService,
  ) { }

  onAddToShoppingList(): void {
    this.recipeService.addIngredientsToShoppingList(this.recipe!.ingredients);
  }
}
