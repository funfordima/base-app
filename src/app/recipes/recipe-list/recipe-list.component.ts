import type { OnDestroy, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { pluck } from 'rxjs/operators';

import type * as fromApp from '../../store/app.reducer';
import type { Recipe } from '../models/recipe.model';
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
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly store: Store<fromApp.AppState>,
  ) { }

  ngOnInit(): void {
    this.subSink.sink = this.store.select('recipes').pipe(
      pluck('recipes'),
    ).subscribe((recipes) => this.recipes = recipes);
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

  onNewRecipe(): void {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }
}
