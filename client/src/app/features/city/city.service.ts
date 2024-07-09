import { City } from '../../Models/City';
import { Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CityService extends ApiService<City>{

  constructor(http:HttpClient , @Inject('apiUrl') protected apiUrl:string ) 
  {
    super(http,environment.apiUrl+'City')
  }

  searchByName(name : string):Observable<City>{
    
    return this.http.get<City>(`${this.apiUrL}/${name}`)
  }

  filterByGovernate(id:number):Observable<City[]>{
    return this.http.get<City[]>(`${this.apiUrL}/governate/${id}`);
  }


  getCities(page: number, size: number): Observable<City[]> {
    
    let params = new HttpParams()
      .set('pageNumber', page.toString())
      .set('pageSize', size.toString());
      console.log(this.apiUrL)
    // Make the GET request with the query parameters
    return this.http.get<any>(this.apiUrl +'City', { params });
  }

}
