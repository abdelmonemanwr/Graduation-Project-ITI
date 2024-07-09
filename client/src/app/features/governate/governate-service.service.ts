import { Governate } from './../../Models/Governate';
import { Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class GovernateServiceService extends ApiService<Governate>{

  constructor(http:HttpClient , @Inject('apiUrl') protected apiUrl:string ) 
  {
    super(http,environment.apiUrl+'governate')
  }

  searchByName(name : string):Observable<Governate>{

    return this.http.get<Governate>(`${this.apiUrL}/${name}`)
  }
  
  getGovernates(pageNumber: number = 1, pageSize: number = 10): Observable<Governate[]> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    console.log(`calling ${this.apiUrL}`, { params })
    return this.http.get<Governate[]>(`${this.apiUrL}`, { params });
  }

}
