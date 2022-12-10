import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import { IngredientModel } from 'src/app/shared/models/ingredient.model';
import { SubSink } from 'src/app/shared/utils/subsink.util';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

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

    // this.subs.sink = this.shoppingListService.getEditElementIndex().pipe(
    //   tap((index) => {
    //     this.editMode = true;
    //     this.editItemIndex = index;
    //     this.editedItem = this.shoppingListService.getIngredient(index);
    //     this.form?.setValue({
    //       userName: this.editedItem.name,
    //       amount: this.editedItem.amount,
    //     });
    //   }),
    // ).subscribe();
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
      // this.shoppingListService.updateIngredient(this.editItemIndex!, newIngredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient));
    } else {
      // this.shoppingListService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }

    this.onClear();
  }

  onDelete(): void {
    // this.shoppingListService.deleteIngredient(this.editItemIndex!);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  onClear(): void {
    this.editMode = false;
    this.form?.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
