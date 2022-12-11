import type { OnDestroy, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import type { Recipe } from '../models/recipe.model';
import { RecipeService } from './services/recipe.service';
import { SubSink } from 'src/app/shared/utils/subsink.util';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes?: Recipe[];

  private subSink = new SubSink();

  constructor(
    private readonly recipeService: RecipeService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.subSink.sink = this.recipeService.recipeList$!.subscribe((recipes) => this.recipes = recipes);
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

  onNewRecipe(): void {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }
}
