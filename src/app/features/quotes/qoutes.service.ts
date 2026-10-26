import { Injectable } from '@angular/core';
import { BaseApiService } from '../../core/services/base-api.service';
import { Observable } from 'rxjs';
import { IQuotesResponse } from './interface/IQuotesResponse';

@Injectable({
  providedIn: 'root'
})
export class QuotesService extends BaseApiService {

  key: string = 'quotes';

  getQuotes(): Observable<IQuotesResponse> {
    return this.get<IQuotesResponse>('');
  }

}