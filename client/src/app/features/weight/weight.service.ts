import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeightService {

  private apiUrl = 'https://localhost:5000/api/WeightOptions'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  getWeightSettings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  addWeightSettings(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateWeightSettings(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error occurred:', error);
    return throwError('Error occurred');
  }
}
