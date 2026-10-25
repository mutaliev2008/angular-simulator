import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { recipesActions } from '../../recipes.actions';
import { selectError, selectLoading, selectRecipes } from '../../recipes.selectors';
import { RecipeCardComponent } from '../../component/recipe-card/recipe-card.component';
import { AsyncPipe } from '@angular/common';
import { IRecipe } from '../../interface/IRecipe';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeCardComponent, AsyncPipe],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent implements OnInit {

  store: Store = inject(Store);
  recipes$: Observable<IRecipe[]> = this.store.select(selectRecipes);
  error$: Observable<string | null> = this.store.select(selectError);
  isLoading$: Observable<boolean> = this.store.select(selectLoading);

  
  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(): void {
    this.store.dispatch(recipesActions.loadRecipes());
  }

}
