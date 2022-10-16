import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

import { IngredientModel } from "src/app/shared/models/ingredient.model";
import { ShoppingListService } from "src/app/shopping-list/services/shopping-list.service";

import { Recipe } from "../../models/recipe.model";

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe({
      name: 'Tasty Schnitzel',
      description: 'A super tasty Schnitzel - just awesome!',
      imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Schnitzel_Tomate-Mozzarella.jpg/1200px-Schnitzel_Tomate-Mozzarella.jpg?20100926124858',
      ingredients: [
        new IngredientModel({
          name: 'Meat',
          amount: 1,
        }),
        new IngredientModel({
          name: 'French fries',
          amount: 20,
        }),
      ],
    }),
    new Recipe({
      name: 'Big Fat Burger',
      description: 'What else you need to say?',
      imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/NCI_Visuals_Food_Hamburger.jpg/1200px-NCI_Visuals_Food_Hamburger.jpg?20070521215905',
      ingredients: [
        new IngredientModel({
          name: 'Buns',
          amount: 2,
        }),
        new IngredientModel({
          name: 'Meat',
          amount: 2,
        }),
      ],
    }),
  ];
  recipeList$?: Observable<Recipe[]>;

  private recipeChanged = new Subject<Recipe[]>();

  constructor(
    private readonly shoppingListService: ShoppingListService,
  ) {
    this.recipeList$ = this.recipeChanged.asObservable();
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: IngredientModel[]): void {
    this.shoppingListService.addIngredients(ingredients);
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
}
