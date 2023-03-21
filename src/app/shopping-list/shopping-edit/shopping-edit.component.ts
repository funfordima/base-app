import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { tap } from 'rxjs/operators';

import { IngredientModel } from 'src/app/shared/models/ingredient.model';
import { SubSink } from 'src/app/shared/utils/subsink.util';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnDestroy, OnInit {
  @ViewChild('f') form?: NgForm;

  editMode = false;
  editItemIndex?: number;
  editedItem?: IngredientModel;

  subs = new SubSink();

  constructor(
    private readonly shoppingListService: ShoppingListService,
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.shoppingListService.getEditElementIndex().pipe(
      tap((index) => {
        this.editMode = true;
        this.editItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.form?.setValue({
          userName: this.editedItem.name,
          amount: this.editedItem.amount,
        });
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
      this.shoppingListService.updateIngredient(this.editItemIndex!, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }

    this.onClear();
  }

  onDelete(): void {
    this.shoppingListService.deleteIngredient(this.editItemIndex!);
    this.onClear();
  }

  onClear(): void {
    this.editMode = false;
    this.form?.reset();
  }
}
