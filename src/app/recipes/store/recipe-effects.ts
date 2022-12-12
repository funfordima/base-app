import { Injectable } from '@angular/core';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import type * as fromApp from '../../store/app.reducer';
import * as RecipesActions from './recipe-actions';
import { ofType } from '@ngrx/effects';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { DataStorageApiService } from 'src/app/shared/services/data-storage-api.service';

@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => this.dataStorageApiService.fetchRecipes()),
    map((recipes) => recipes.map((recipe) => ({
      ...recipe,
      ingredients: recipe?.ingredients ?? [],
    }))),
    map((recipes) => new RecipesActions.SetRecipes(recipes)),
  );

  @Effect({
    dispatch: false,
  })
  storeRecipes = this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    // pluck('recipes'),
    switchMap(([_, { recipes }]) => this.dataStorageApiService.storeRecipes(recipes)),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<fromApp.AppState>,
    private readonly dataStorageApiService: DataStorageApiService,
  ) { }
}
