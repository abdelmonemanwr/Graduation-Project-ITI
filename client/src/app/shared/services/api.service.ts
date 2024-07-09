import { Observable} from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable,Inject } from '@angular/core';
import { environment} from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ApiService<T> {

  protected apiUrL : string;

  
  constructor(protected http: HttpClient, @Inject('apiUrl') protected _apiUrl:string) 
  {
      this.apiUrL = _apiUrl

  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrL)
  }

  getById(itemId: number|string): Observable<T> {
    return this.http.get<T>(`${this.apiUrL}/${itemId}`);
  }

  addItem(item: any): Observable<T> {
    return this.http.post<T>(this.apiUrL, item)
  }

  editItem(itemId: number|string, item: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrL}/${itemId}`, item) 
  }

  deleteItem(itemId: number |string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrL}/${itemId}`)
  }

}
