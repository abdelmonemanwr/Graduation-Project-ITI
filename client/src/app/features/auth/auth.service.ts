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
      localStorage.setItem('token', response.token);
      localStorage.setItem('role', response.role);
      return response;
    }));
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  forgetPassword(credentials:ForgetPasswordDTO): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(`${this.apiURL}Account/ForgetPassword`, { credentials },  this.httpOptions);
  }

  resetPassword(data: ResetPasswordDTO): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(`${this.apiURL}/Account/resetPassword`, data);
  }

  getUserDetails():Observable<UserDetailsDTO>{
    const token = this.getToken();
    const url = `${this.apiURL}Account/GetUserDetails`;
    // console.log(`get user details url: ${url}`);
    return this.http.get<UserDetailsDTO>(url, { headers: { Authorization: `Bearer ${token}` } });
  }

  // getUserDetails(): Observable<UserDetailsDTO> {
  //   const url = `${this.apiURL}Account/GetUserDetails`;
  //   return this.http.get<UserDetailsDTO>(url);
  // }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRole(): string | null {
    return localStorage.getItem(this.roleKey);
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
