import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User, AuthUser, LoginRequest, RegisterRequest } from '../models/user.model';
import { ApiResponse } from '../models/api.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private readonly TOKEN_KEY = 'auth_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly USER_KEY = 'current_user';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadUserFromStorage();
  }

  login(credentials: LoginRequest): Observable<boolean> {
    return this.http.post<ApiResponse<AuthUser>>(`${environment.apiUrl}/auth/login`, credentials)
      .pipe(
        map(response => {
          if (response.success && response.data) {
            this.setAuthData(response.data);
            return true;
          }
          return false;
        }),
        catchError(() => of(false))
      );
  }

  register(userData: RegisterRequest): Observable<boolean> {
    return this.http.post<ApiResponse<AuthUser>>(`${environment.apiUrl}/auth/register`, userData)
      .pipe(
        map(response => {
          if (response.success && response.data) {
            this.setAuthData(response.data);
            return true;
          }
          return false;
        }),
        catchError(() => of(false))
      );
  }

  loginWithGoogle(): Observable<boolean> {
    // Implement Google OAuth login
    return this.http.get<ApiResponse<AuthUser>>(`${environment.apiUrl}/auth/google`)
      .pipe(
        map(response => {
          if (response.success && response.data) {
            this.setAuthData(response.data);
            return true;
          }
          return false;
        }),
        catchError(() => of(false))
      );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  refreshToken(): Observable<boolean> {
    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);
    if (!refreshToken) {
      return of(false);
    }

    return this.http.post<ApiResponse<AuthUser>>(`${environment.apiUrl}/auth/refresh`, { refreshToken })
      .pipe(
        map(response => {
          if (response.success && response.data) {
            this.setAuthData(response.data);
            return true;
          }
          return false;
        }),
        catchError(() => of(false))
      );
  }

  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<ApiResponse<any>>(`${environment.apiUrl}/auth/forgot-password`, { email })
      .pipe(
        map(response => response.success),
        catchError(() => of(false))
      );
  }

  resetPassword(token: string, password: string): Observable<boolean> {
    return this.http.post<ApiResponse<any>>(`${environment.apiUrl}/auth/reset-password`, { token, password })
      .pipe(
        map(response => response.success),
        catchError(() => of(false))
      );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY) && !!this.currentUserSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private setAuthData(authData: AuthUser): void {
    localStorage.setItem(this.TOKEN_KEY, authData.token);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, authData.refreshToken);
    localStorage.setItem(this.USER_KEY, JSON.stringify(authData.user));
    this.currentUserSubject.next(authData.user);
  }

  private loadUserFromStorage(): void {
    const userJson = localStorage.getItem(this.USER_KEY);
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error('Error parsing user data from storage:', error);
        this.logout();
      }
    }
  }
}