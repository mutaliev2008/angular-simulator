import { createReducer, on } from "@ngrx/store";
import { IRecipesState } from "./recipes.model";
import { recipesActions } from "./recipes.actions";

export const initialRecipesState: IRecipesState = {
  items: [],
  loading: false,
  error: null
};

export const recipesReducer = createReducer(
  initialRecipesState,
  on(recipesActions.loadRecipes, (state) => ({
    ...state,
    loading: true
  })),
  on(recipesActions.loadRecipesSuccess, (state, { recipes }) => ({
    ...state,
    items: recipes,
    loading: false
  })),
  on(recipesActions.loadRecipesFailure, (state) => ({
    ...state,
    error: state.error,
    loading: false
  }))
);