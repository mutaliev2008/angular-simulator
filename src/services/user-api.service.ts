import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IUser } from '../interface/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  
  private http: HttpClient = inject(HttpClient);

  getUsers(): IUser[] {
    let data: IUser[] = []
    this.http.get<IUser[]>('https://jsonplaceholder.typicode.com/users').pipe(
      tap((users) => {
         data = users
      })
    ).subscribe() 
    return data
  }

 

}
