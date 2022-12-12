import type { OnDestroy, OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import type { AbstractControl } from '@angular/forms';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, pluck } from 'rxjs/operators';

import type * as fromApp from '../../../store/app.reducer';
import * as RecipeActions from '../../store/recipe-actions';
import { WINDOW } from 'src/app/core/providers/window-token';
import { SubSink } from 'src/app/shared/utils/subsink.util';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id?: number;
  editMode = false;
  recipeForm!: FormGroup;

  private subs = new SubSink();

  constructor(
    @Inject(WINDOW) private readonly windowRef: Window,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store<fromApp.AppState>,
  ) { }

  ngOnInit(): void {
    this.subs.sink = this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id'];
      this.editMode = !!params['id'];
      this.initForm();
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onSubmit(): void {
    if (this.editMode) {
      this.store.dispatch(new RecipeActions.UpdateRecipe({ index: this.id!, newRecipe: this.recipeForm.value }));
      window.history.back();
      return;
    }

    this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value));
    this.windowRef.history.back();
  }

  onAddIngredient(): void {
    this.ingredientsFormArray.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  onDeleteIngredient(index: number): void {
    this.ingredientsFormArray.removeAt(index);
  }

  get controls(): AbstractControl[] {
    return this.ingredientsFormArray.controls;
  }

  private get ingredientsFormArray(): FormArray {
    return (<FormArray>this.recipeForm.get('ingredients'));
  }

  private initForm(): void {
    let recipeIngredients = new FormArray([]);
    let name = '';
    let description = '';
    let ingredients = [];
    let imagePath = '';

    if (this.editMode) {
      this.subs.sink = this.store.select('recipes').pipe(
        pluck('recipes'),
        map((recipes) => recipes.find((_, index) => index === this.id)),
      ).subscribe((recipe) => {
        name = recipe?.name;
        description = recipe?.description;
        ingredients = recipe?.ingredients;
        imagePath = recipe?.imagePath;

        if (ingredients) {
          for (let ingredient of ingredients) {
            recipeIngredients.push(new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            }));
          }
        }
      });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      description: new FormControl(description, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      ingredients: recipeIngredients,
    });
  }
}
