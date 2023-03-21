import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SubSink } from 'src/app/shared/utils/subsink.util';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../recipe-list/services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe?: Recipe;
  id?: number;

  private subs = new SubSink();

  constructor(
    private readonly recipeService: RecipeService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id!);
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
    this.recipeService.deleteRecipe(this.id!);
    this.router.navigate(['/recipes']);
  }
}
