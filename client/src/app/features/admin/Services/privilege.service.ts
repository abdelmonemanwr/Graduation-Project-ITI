import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PrivilegeDTO } from '../interfaces/privilege-dto';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrivilegeService {
  private apiUrl = `${environment.apiUrl}privilege`;

  constructor(private http: HttpClient) {}

  getPrivileges(): Observable<PrivilegeDTO[]> {
    return this.http.get<PrivilegeDTO[]>(this.apiUrl);
  }

  getPrivilegeById(id: number): Observable<PrivilegeDTO> {
    return this.http.get<PrivilegeDTO>(`${this.apiUrl}/GetPrivilegeById/${id}`);
  }

}
