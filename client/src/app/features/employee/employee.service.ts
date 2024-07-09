import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../shared/services/api.service';
import { environment } from '../../../environments/environment';
import { Employee } from '../../Models/Employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends ApiService<Employee> {
  


  constructor(http:HttpClient , @Inject('apiUrl') protected apiUrl:string ) 
  {
    super(http,environment.apiUrl+'employees')
  }


  searchByName(name : string):Observable<Employee>{
    return this.http.get<Employee>(`${this.apiUrL}/name/${name}`)
  }

 
}
