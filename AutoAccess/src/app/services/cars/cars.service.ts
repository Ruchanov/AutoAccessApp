import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  private apiUrl = 'http://127.0.0.1:8000/cars/';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getCars(params: any): Observable<Car[]> {
    const httpParams = new HttpParams({ fromObject: params });
    return this.http.get<Car[]>(this.apiUrl, { params: httpParams });
  }

  getFavorites(): Observable<number[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<number[]>(`${this.apiUrl}get_favorites/`, { headers });
  }

  addToFavorites(carId: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.post<void>(`${this.apiUrl}add_to_favorites/`, { car_id: carId }, { headers });
  }

  removeFromFavorites(carId: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.post<void>(`${this.apiUrl}remove_from_favorites/`, { car_id: carId }, { headers });
  }
  getCarById(carId: number): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}${carId}/`);
  }  
  createCar(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}create/`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  }
}
