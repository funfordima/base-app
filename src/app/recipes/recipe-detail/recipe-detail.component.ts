import type { OnDestroy, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, pluck, switchMap, tap } from 'rxjs/operators';

import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import type * as fromApp from '../../store/app.reducer';
import type { Recipe } from '../models/recipe.model';
import * as RecipeActions from '../store/recipe-actions';
import { SubSink } from 'src/app/shared/utils/subsink.util';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe?: Recipe;
  id?: number;

  private subs = new SubSink();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store<fromApp.AppState>,
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.activatedRoute.params.pipe(
      switchMap((params) => this.store.select('recipes').pipe(
        pluck('recipes'),
        map((recipes) => recipes.find((_, index) => index === +params['id'])),
        tap(() => this.id = +params['id']),
      )),
    ).subscribe((recipe) => {
      this.recipe = recipe;
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onAddToShoppingList(): void {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe!.ingredients));
  }

  onEditRecipe(): void {
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute });
  }

  onDeleteRecipe(): void {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id!));
    this.router.navigate(['/recipes']);
  }
}
