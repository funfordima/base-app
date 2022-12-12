import type { OnDestroy } from '@angular/core';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, pluck } from 'rxjs/operators';

import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe-actions';
import { SubSink } from '../shared/utils/subsink.util';
import type * as fromApp from '../store/app.reducer';

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
    private readonly store: Store<fromApp.AppState>,
  ) { }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

  onSaveData(): void {
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchData(): void {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout(): void {
    this.store.dispatch(new AuthActions.Logout());
  }
}
