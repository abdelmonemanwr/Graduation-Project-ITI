import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Merchant, MerchantDTO } from './merchant.model';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  private apiUrl = 'https://localhost:5000/api/merchants';  // Adjust URL as needed

  constructor(private http: HttpClient) {}

  getMerchants(page: number, pageSize: number): Observable<Merchant[]> {
    return this.http.get<Merchant[]>(`${this.apiUrl}?page=${page}&pageSize=${pageSize}`);
  }

  getMerchantById(id: string): Observable<Merchant> {
    return this.http.get<Merchant>(`${this.apiUrl}/${id}`);
  }

  createMerchant(merchant: MerchantDTO): Observable<Merchant> {
    let data= this.http.post<Merchant>(this.apiUrl, merchant);
    console.log(data)
    return data
  }

  updateMerchant(id: string, merchant: MerchantDTO): Observable<void> {
    let data = this.http.put<void>(`${this.apiUrl}/${id}`, merchant)
    return data;
  }
  
  // Since we are not deleting but using a flag, this method could be different based on your API
  deleteMerchant(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
