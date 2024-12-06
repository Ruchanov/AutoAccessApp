import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = 'http://127.0.0.1:8000'; // Укажите базовый URL вашего API

  constructor(private http: HttpClient) {}

  // Получение данных профиля пользователя
  getProfile(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
    return this.http.get<any>(`${this.baseUrl}/profile`, { headers });
  }

  // Получение постов пользователя
  getUserPosts(): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    });
    return this.http.get<any[]>(`${this.baseUrl}/cars/user_posts/`, { headers });
  }
}
