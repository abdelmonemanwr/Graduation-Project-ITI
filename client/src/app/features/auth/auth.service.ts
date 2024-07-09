import { GroupPrivilegeDTO } from './../admin/interfaces/group-privilege-dto';
import { LoginDTO } from './interfaces/login-dto';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ResponseDTO } from './interfaces/response-dto';
import { ForgetPasswordDTO } from './interfaces/forget-password-dto';
import { Router } from '@angular/router';
import { ResetPasswordDTO } from './interfaces/reset-password-dto';
import { UserDetailsDTO } from './interfaces/user-details-dto';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  private roleKey = 'role';
  private privilegesKey = 'privileges';

  private apiURL = environment.apiUrl;

  private httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    })
  };

  constructor(private http:HttpClient, private router: Router) { }

  login(loginCredentials: LoginDTO): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(`${this.apiURL}Account/Login`, loginCredentials, this.httpOptions).pipe(map(response => {
      console.log("res ",JSON.stringify(response));
      localStorage.setItem('token', response.token);
      localStorage.setItem('role', response.role);
      this.GetUserPrivilegesByUserId();
      return response;
    }));
  }
  
  private GetUserPrivilegesByUserId(){
    this.http.get<GroupPrivilegeDTO>(`${this.apiURL}Account/GetUserPrivilegesByUserId`).subscribe({
      next: (data) => {
        localStorage.setItem(this.privilegesKey, JSON.stringify(data));
      }
    })
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    localStorage.removeItem(this.privilegesKey);
    this.router.navigate(['/login']);
  }

  forgetPassword(credentials:ForgetPasswordDTO): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(`${this.apiURL}Account/ForgetPassword`, { credentials },  this.httpOptions);
  }

  resetPassword(data: ResetPasswordDTO): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(`${this.apiURL}/Account/resetPassword`, data);
  }

  getUserDetails(): Observable<UserDetailsDTO> {
    const url = `${this.apiURL}Account/GetUserDetails`;
    return this.http.get<UserDetailsDTO>(url);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  getPrivileges(): GroupPrivilegeDTO[] | null {
    const privileges = localStorage.getItem(this.privilegesKey);
    return privileges ? JSON.parse(privileges) : null;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return (token !== null && !this.isTokenExpired(token));
  }

  private isTokenExpired(token: string): boolean {
    const decoded: any = jwtDecode(token);
    const isExpired = (decoded.exp * 1000) <= Date.now();
    if (isExpired) {
      this.logout();
    }
    return isExpired;
  }
}
