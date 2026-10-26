import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RecipesService } from "./recipes.service";
import { recipesActions } from "./recipes.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { IRecipesResponse } from "./interface/IRecipesResponse";

@Injectable()
export class RecipesEffects {

  action$: Actions = inject(Actions);
  recipesService: RecipesService = inject(RecipesService);

  loadRecipes$ = createEffect(() => 
    this.action$.pipe(
      ofType(recipesActions.loadRecipes),
      mergeMap(() => this.recipesService.getRecipes().pipe(
        map((recipesResponse: IRecipesResponse) => recipesActions.loadRecipesSuccess({ recipes: recipesResponse.recipes })),
        catchError((error: HttpErrorResponse) => of(recipesActions.loadRecipesFailure({ error: error.message })))
      ))
    )
  );

}