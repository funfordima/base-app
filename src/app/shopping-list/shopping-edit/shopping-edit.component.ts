import type { OnDestroy, OnInit} from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import type * as fromApp from '../../store/app.reducer';
import * as ShoppingListActions from '../store/shopping-list.actions';
import { IngredientModel } from 'src/app/shared/models/ingredient.model';
import { SubSink } from 'src/app/shared/utils/subsink.util';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnDestroy, OnInit {
  @ViewChild('f') form?: NgForm;

  editMode = false;
  editedItem?: IngredientModel;

  subs = new SubSink();

  constructor(
    private readonly store: Store<fromApp.AppState>,
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.store.select('shoppingList').pipe(
      tap((stateData) => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          this.form?.setValue({
            userName: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        } else {
          this.editMode = false;
        }
      }),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onSubmit(form: NgForm): void {
    const value = form.value;
    const newIngredient = new IngredientModel({
      name: value.userName,
      amount: parseInt(value.amount, 10),
    });

    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }

    this.onClear();
  }

  onDelete(): void {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  onClear(): void {
    this.editMode = false;
    this.form?.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
