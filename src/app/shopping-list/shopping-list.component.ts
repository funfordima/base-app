import type { OnDestroy, OnInit } from '@angular/core';
import { Component } from '@angular/core';

import type { IngredientModel } from '../shared/models/ingredient.model';
import { SubSink } from '../shared/utils/subsink.util';
import { ShoppingListService } from './services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: IngredientModel[] = [];

  private subs = new SubSink();

  constructor(
    private readonly shoppingListService: ShoppingListService,
  ) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subs.sink = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients) => this.ingredients = ingredients
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onEditItem(index: number): void {
    this.shoppingListService.setEditElementIndex(index);
  }
}
