import type { Recipe } from "../models/recipe.model";
import * as RecipesActions from './recipe-actions';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [],
};

export function recipeReducer(
  state = initialState,
  action: RecipesActions.RecipesActions,
): State {
  switch (action.type) {
    case RecipesActions.SET_RECIPES: {
      return {
        ...state,
        recipes: [...action.payload],
      };
    }

    case RecipesActions.ADD_RECIPE: {
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    }

    case RecipesActions.UPDATE_RECIPE: {
      const recipes = [...state.recipes];
      recipes[action.payload.index] = { ...recipes[action.payload.index], ...action.payload.newRecipe };

      return {
        ...state,
        recipes,
      };
    }

    case RecipesActions.DELETE_RECIPE: {
      return {
        ...state,
        recipes: state.recipes.filter((_, index) => index !== action.payload),
      };
    }

    default: {
      return { ...state };
    }
  }
}
