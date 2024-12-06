import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NonAuthUser } from '../../models';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/token/`, { username, password });
  }

  register(user: NonAuthUser): Observable<any> {
    return this.http.post(`${this.baseUrl}/register/`, user);
  }

  setTokens(access: string, refresh: string, username: string): void  {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    localStorage.setItem('username', username);

    const decodedToken: any = jwtDecode(access);
    const userId = decodedToken.user_id;

    if (userId) {
      localStorage.setItem('user_id', userId.toString());
    }
  }

  clearTokens(): void  {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_id');
  }
}
