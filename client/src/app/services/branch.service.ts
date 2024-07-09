import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class BranchService {
  private apiURL = 'https://localhost:5000/api/Branches';

  constructor(private http: HttpClient) {}

  getBranches(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}`);
  }

  createBranch(branch: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}`, branch);
  }

  deleteBranch(branchId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${branchId}`);
  }

  updateBranch(branchId: string, branch: any): Observable<any> {
    return this.http.put<any>(`${this.apiURL}/${branchId}`, branch);
  }

}
