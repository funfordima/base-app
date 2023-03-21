import { Component, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';
import { RecipeService } from '../recipes/recipe-list/services/recipe.service';

import { DataStorageApiService } from '../shared/services/data-storage-api.service';
import { SubSink } from '../shared/utils/subsink.util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  collapsed = false;
  isAuthenticated$ = this.authService.user$.pipe(
    map((user) => !!user),
  );

  private subSink = new SubSink();

  constructor(
    private readonly dataStorageApiService: DataStorageApiService,
    private readonly recipeService: RecipeService,
    private readonly authService: AuthService,
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
    this.authService.logout();
  }
}
