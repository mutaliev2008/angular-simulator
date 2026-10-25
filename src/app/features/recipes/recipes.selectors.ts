import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IRecipesState, RECIPES_FEATURE_KEY } from "./recipes.model";

export const selectRecipesState = createFeatureSelector<IRecipesState>(RECIPES_FEATURE_KEY);

export const selectRecipes = createSelector(selectRecipesState, ((state) => state.items));
export const selectError = createSelector(selectRecipesState, ((state) => state.error));
export const selectLoading = createSelector(selectRecipesState, ((state) => state.loading));

