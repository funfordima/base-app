import { EventEmitter } from "@angular/core";
import { IngredientModel } from "src/app/shared/models/ingredient.model";

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<IngredientModel[]>();
  private ingredients: IngredientModel[] = [
    new IngredientModel({
      name: 'Apple',
      amount: 10,
    }),
    new IngredientModel({
      name: 'Tomato',
      amount: 20,
    })
  ];

  getIngredients(): IngredientModel[] {
    return [...this.ingredients];
  }

  addIngredient(ingredient: IngredientModel): void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: IngredientModel[]): void {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
