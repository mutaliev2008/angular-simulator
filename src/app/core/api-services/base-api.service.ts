import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { API_URL } from "../tokens/api.token";
import { IProductsQuery } from "../../features/products/interfaces/IProduct";
import { Observable } from "rxjs";

@Injectable()
export abstract class BaseApiService {

  protected http: HttpClient = inject(HttpClient);
  private API_URL: string = inject(API_URL);
  abstract key: string;

  protected getUrl(url:string | number): string {
    const urlString: string = typeof url === 'number'? String(url) : url;
    const preparedUrl: string = `${ this.API_URL }/${ this.key }/${ urlString }`;
    
    return preparedUrl;
  }

  protected getParams(params: IProductsQuery): string {
    if (typeof params === 'object') {
      return Object.entries(params).map(([key, value]) => this.getParam(key, value)).filter(Boolean).join('&');
    } else {
      return '';
    }
  }

  getParam(name: string, value: unknown): string {
    if(value) {
      return `${ name }=${ value }`;
    } else {
      return '';
    }
  }

  protected get<T>(url: string, queryParams?: unknown): Observable<T> {
    const preparedUrl: string = queryParams? url + '?' + this.getParams(queryParams): url;
    return this.http.get<T>(this.getUrl(preparedUrl));
  }

}












