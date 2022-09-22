export class IngredientModel {
  constructor(
    opt: Partial<IngredientModel> = {},
    public name: string = opt.name ?? '',
    public amount: number = opt.amount ?? 0,
  ) { }
}
