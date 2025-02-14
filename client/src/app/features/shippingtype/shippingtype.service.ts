import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ShippingTypeService {
  private apiURL = `${environment.apiUrl}ShippingType`;
  constructor(private http: HttpClient) {}

  getShippingTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}`);
  }

  createShippingType(ShippingType: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}`, ShippingType);
  }

  deleteShippingType(sTypeId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${sTypeId}`);
  }

  updateShippingType(sTypeId: string, ShippingType: any): Observable<any> {
    return this.http.put<any>(`${this.apiURL}/${sTypeId}`, ShippingType);
  }

}
