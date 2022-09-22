import { Component, OnInit } from '@angular/core';

import { Recipe } from '../models/recipe.model';
import { RecipeService } from './services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes?: Recipe[];

  constructor(
    private readonly recipeService: RecipeService,
  ) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }
}
