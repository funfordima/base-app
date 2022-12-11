import type { IngredientModel } from "src/app/shared/models/ingredient.model";

export class Recipe {
  constructor(
    opt: Partial<Recipe> = {},
    public name: string = opt.name ?? '',
    public description: string = opt.description ?? '',
    public imagePath: string = opt.imagePath ?? '',
    public ingredients: IngredientModel[] = opt.ingredients ?? [],
  ) { }
}
