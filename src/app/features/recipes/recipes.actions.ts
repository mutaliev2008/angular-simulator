import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IRecipe } from './interface/IRecipe';

export const recipesActions = createActionGroup({
  source: 'Recipes',
  events: {
    loadRecipes: emptyProps(),
    loadRecipesSuccess: props<({ recipes: IRecipe[] })>(),
    loadRecipesFailure: props<({ error: string })>()
  }
});
