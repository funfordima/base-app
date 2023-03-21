import type { Observable} from "rxjs";
import { Subject } from "rxjs";

import { IngredientModel } from "src/app/shared/models/ingredient.model";

export class ShoppingListService {
  ingredientsChanged = new Subject<IngredientModel[]>();

  private startedEditing = new Subject<number>();
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

  getIngredient(index: number): IngredientModel {
    return this.ingredients[index];
  }

  addIngredient(ingredient: IngredientModel): void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: IngredientModel[]): void {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: IngredientModel): void {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number): void {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  getEditElementIndex(): Observable<number> {
    return this.startedEditing.asObservable();
  }

  setEditElementIndex(index: number): void {
    this.startedEditing.next(index);
  }
}
