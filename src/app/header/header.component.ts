import type { OnDestroy } from '@angular/core';
import { Component } from '@angular/core';
import { map, pluck } from 'rxjs/operators';

import * as AuthActions from '../auth/store/auth.actions';
import { RecipeService } from '../recipes/recipe-list/services/recipe.service';
import { DataStorageApiService } from '../shared/services/data-storage-api.service';
import { SubSink } from '../shared/utils/subsink.util';
import type * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {
  collapsed = false;
  isAuthenticated$ = this.store.select('auth').pipe(
    pluck('user'),
    map((user) => !!user),
  );

  private subSink = new SubSink();

  constructor(
    private readonly dataStorageApiService: DataStorageApiService,
    private readonly recipeService: RecipeService,
    private readonly store: Store<fromApp.AppState>,
  ) { }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

  onSaveData(): void {
    const recipes = this.recipeService.getRecipes();

    this.subSink.sink = this.dataStorageApiService.storeRecipes(recipes).subscribe();
  }

  onFetchData(): void {
    this.subSink.sink = this.recipeService.fetchRecipes().subscribe();
  }

  onLogout(): void {
    this.store.dispatch(new AuthActions.Logout());
  }
}
