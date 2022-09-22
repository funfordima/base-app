import { Component, Input, OnInit } from '@angular/core';

import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe?: Recipe;

  constructor(
    private readonly recipeService: RecipeService,
  ) { }

  onSelected(): void {
    this.recipeService.setSelectedRecipe(this.recipe!);
  }
}
