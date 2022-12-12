import { Injectable } from "@angular/core";
import type { Resolve } from '@angular/router';
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import type { Observable } from 'rxjs';
import { of } from 'rxjs';
import { pluck, switchMap, take } from "rxjs/operators";

import type * as fromApp from '../../../store/app.reducer';
import type { Recipe } from '../../models/recipe.model';
import * as RecipeActions from '../../store/recipe-actions';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(
    private readonly store: Store<fromApp.AppState>,
    private readonly actions$: Actions,
  ) { }

  resolve(): Observable<Recipe[]> {
    return this.store.select('recipes').pipe(
      take(1),
      pluck('recipes'),
      switchMap((recipes) => {
        if (!recipes.length) {
          this.store.dispatch(new RecipeActions.FetchRecipes());

          return this.actions$.pipe(
            ofType(RecipeActions.SET_RECIPES),
            take(1),
          );
        }

        return of(recipes);
      }),
    );


  }
}
