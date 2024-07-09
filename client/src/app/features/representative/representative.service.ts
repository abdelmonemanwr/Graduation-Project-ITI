import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class RepresentativeService {
  private apiURL = `${environment.apiUrl}Representatives`;

  constructor(private http: HttpClient) {}

  getRepresentatives(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}`);
  }

  registerRepresentative(representative: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}`, representative);
  }

  deleteRepresentative(representativeId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${representativeId}`);
  }

  updateRepresentative(representativeId: string, representative: any): Observable<any> {
    return this.http.put<any>(`${this.apiURL}/${representativeId}`, representative);
  }
  
  getGovernorates(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/governorates`);
  }
  getBranches(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/branches`);
  }
}
