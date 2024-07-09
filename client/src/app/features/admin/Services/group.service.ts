import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { GroupDTO } from '../interfaces/group-dto';
import { Group } from '../interfaces/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private apiUrl = `${environment.apiUrl}Group`;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {}

  getGroupById(id: string): Observable<Group> {
    return this.http.get<Group>(`${this.apiUrl}/${id}`);
  }
  getGroupDTOById(id: string): Observable<GroupDTO> {
    const uri = `${this.apiUrl}/GetGroupDTO/${id}`;
    console.log(`URI: ${uri}`);
    return this.http.get<GroupDTO>(uri);
  }

  getGroupByName(name: string): Observable<boolean> {
    const params = new HttpParams().set('name', name);
    return this.http.get<boolean>(`${this.apiUrl}/GetGroupByName`, { params,  headers: this.headers });
  }

  createGroup(groupDTO: GroupDTO): Observable<Group> {
    return this.http.post<Group>(`${this.apiUrl}/AddNewGroup`, groupDTO, { headers: this.headers });
  }

  getAllGroups(pageNumber: number, pageSize: number): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.apiUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  updateGroup(groupId: string, groupDTO: GroupDTO): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/UpdateGroup/${groupId}`, groupDTO);
  }

  deleteGroup(groupId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${groupId}`, {headers: this.headers});
  }
}
