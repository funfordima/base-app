import * as ShoppingListActions from "./shopping-list.actions";
import { IngredientModel } from "src/app/shared/models/ingredient.model";

export interface State {
  ingredients: IngredientModel[];
  editedIngredient: IngredientModel | null;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new IngredientModel({
      name: 'Apple',
      amount: 10,
    }),
    new IngredientModel({
      name: 'Tomato',
      amount: 20,
    })
  ],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions): State {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    }

    case ShoppingListActions.ADD_INGREDIENTS: {
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    }

    case ShoppingListActions.UPDATE_INGREDIENT: {
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload,
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };
    }

    case ShoppingListActions.DELETE_INGREDIENT: {
      const updatedIngredients = state.ingredients.filter((_, index) => index !== state.editedIngredientIndex);

      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };
    }

    case ShoppingListActions.START_EDIT: {
      const editedIngredient = { ...state.ingredients[action.payload] };

      return {
        ...state,
        editedIngredient,
        editedIngredientIndex: action.payload,
      };
    }

    case ShoppingListActions.STOP_EDIT: {
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };
    }

    default: {
      return { ...state };
    }
  }
}
