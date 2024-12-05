import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  private apiUrl = 'http://127.0.0.1:8000/api/cars/';

  constructor(private http: HttpClient) {}

  getCars(params: any): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl, { params });
  }

  addToFavorites(carId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}add_to_favorites/`, { car_id: carId });
  }

  removeFromFavorites(carId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}remove_from_favorites/`, { car_id: carId });
  }

  getFavorites(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}get_favorites/`);
  }
}
