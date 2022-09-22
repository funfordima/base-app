import { Component, ElementRef, ViewChild } from '@angular/core';

import { IngredientModel } from 'src/app/shared/models/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') nameInput?: ElementRef<HTMLInputElement>;
  @ViewChild('amountInput') amountInput?: ElementRef<HTMLInputElement>;

  constructor(
    private readonly shoppingListService: ShoppingListService,
  ) { }

  onAddItem(): void {
    const newIngredient = new IngredientModel({
      name: this.nameInput?.nativeElement.value!,
      amount: parseInt(this.amountInput?.nativeElement.value!, 10),
    });

    this.shoppingListService.addIngredient(newIngredient);
  }
}
