import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/auth';

  register(user: any): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/register`, user, {
      responseType: 'text' as 'json'
    });
  }

  // 👈 EL LOGIN ENVÍA email y password
  login(credentials: any): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getUsername(): string | null {
  const token = this.getToken();
  if (!token) return null;

  const decoded: any = jwtDecode(token);

  return decoded.username; // 👈 lo que agregaste en backend
}
}