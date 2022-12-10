import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { IngredientModel } from '../shared/models/ingredient.model';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: IngredientModel[] }> = of({ ingredients: [] });

  // private subs = new SubSink();

  constructor(
    private readonly store: Store<fromApp.AppState>,
  ) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.subs.sink = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ingredients) => this.ingredients = ingredients
    // );
  }

  // ngOnDestroy(): void {
  // this.subs.unsubscribe();
  // }

  onEditItem(index: number): void {
    // this.shoppingListService.setEditElementIndex(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
