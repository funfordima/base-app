import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Inject } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WINDOW } from 'src/app/core/providers/window-token';

import { SubSink } from 'src/app/shared/utils/subsink.util';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../services/recipe.service';

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
    private readonly recipeService: RecipeService,
    private readonly router: Router,
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
      this.recipeService.updateRecipe(this.id!, this.recipeForm.value);
      window.history.back();
      return;
    }

    this.recipeService.addRecipe(this.recipeForm.value);
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
    const newRecipe = this.editMode ?
      this.recipeService.getRecipe(this.id!) :
      new Recipe({});
    let recipeIngredients = new FormArray([]);
    const name = newRecipe?.name;
    const description = newRecipe?.description;
    const ingredients = newRecipe?.ingredients;
    const imagePath = newRecipe?.imagePath;

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

    this.recipeForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      description: new FormControl(description, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      ingredients: recipeIngredients,
    });
  }
}
