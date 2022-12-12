import type { OnDestroy, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, pluck, switchMap, tap } from 'rxjs/operators';

import type * as fromApp from '../../store/app.reducer';
import type { Recipe } from '../models/recipe.model';
import { RecipeService } from '../recipe-list/services/recipe.service';
import * as RecipeActions from '../store/recipe-actions';
import { Store } from '@ngrx/store';
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
    private readonly recipeService: RecipeService,
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
      // this.recipe = this.recipeService.getRecipe(this.id!);
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onAddToShoppingList(): void {
    this.recipeService.addIngredientsToShoppingList(this.recipe!.ingredients);
  }

  onEditRecipe(): void {
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute });
  }

  onDeleteRecipe(): void {
    // this.recipeService.deleteRecipe(this.id!);
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id!));
    this.router.navigate(['/recipes']);
  }
}
