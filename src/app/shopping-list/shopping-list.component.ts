import type { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import type { Observable} from 'rxjs';
import { of } from 'rxjs';

import type { IngredientModel } from '../shared/models/ingredient.model';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import type * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: IngredientModel[] }> = of({ ingredients: [] });

  constructor(
    private readonly store: Store<fromApp.AppState>,
  ) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
  }

  onEditItem(index: number): void {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
