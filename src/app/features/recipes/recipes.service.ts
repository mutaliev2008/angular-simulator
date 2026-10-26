import { Injectable } from '@angular/core';
import { BaseApiService } from '../../core/services/base-api.service';
import { Observable } from 'rxjs';
import { IRecipesResponse } from './interface/IRecipesResponse';

@Injectable({
  providedIn: 'root'
})
export class RecipesService extends BaseApiService {

  key: string = 'recipes';

  getRecipes(): Observable<IRecipesResponse> {
    return this.get<IRecipesResponse>('');
  }

}