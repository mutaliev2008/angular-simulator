import { IRecipe } from './interface/IRecipe';

export interface IRecipesState {
  items: IRecipe[];
  loading: boolean;
  error: string | null;
}

export const RECIPES_FEATURE_KEY: string = 'recipes';