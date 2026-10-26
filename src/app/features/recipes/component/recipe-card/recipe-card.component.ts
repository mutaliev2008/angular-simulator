import { Component, input, InputSignal } from '@angular/core';
import { IRecipe } from '../../interface/IRecipe';

@Component({
  selector: 'app-recipe-card',
  imports: [],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent {

  recipe: InputSignal<IRecipe> = input.required<IRecipe>();

}
