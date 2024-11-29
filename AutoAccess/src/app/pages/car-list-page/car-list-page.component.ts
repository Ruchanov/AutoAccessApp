import { Component, OnInit } from '@angular/core';
import { CarsService } from '../../services/cars/cars.service';
import { Car } from '../../models';

@Component({
  selector: 'app-car-list-page',
  templateUrl: './car-list-page.component.html',
  styleUrls: ['./car-list-page.component.css'],
})
export class CarListPageComponent implements OnInit {
  cars: Car[] = [];
  searchQuery: string = '';
  isFilterVisible: boolean = false;

  // Параметры фильтрации
  filterParams = {
    year: '',
    marka: '',
    model: '',
    min_price: '',
    max_price: '',
    min_mileage: '',
    max_mileage: '',
  };

  favoriteCars: Set<number> = new Set();

  constructor(private carsService: CarsService) {}

  ngOnInit(): void {
    this.loadFavorites();
    this.loadCars();
  }

  toggleFilter(): void {
    this.isFilterVisible = !this.isFilterVisible;
  }

  loadFavorites(): void {
    this.carsService.getFavorites().subscribe((favorites) => {
      this.favoriteCars = new Set(favorites);
    });
  }

  loadCars(): void {
    const params = { ...this.filterParams, search: this.searchQuery };
    this.carsService.getCars(params).subscribe((data) => {
      this.cars = data.map((car) => ({
        ...car,
        liked: this.favoriteCars.has(car.id),
      }));
    });
  }

  toggleLike(carId: number): void {
    if (this.favoriteCars.has(carId)) {
      this.carsService.removeFromFavorites(carId).subscribe(() => {
        this.favoriteCars.delete(carId);
        this.updateCarLikeStatus(carId, false);
      });
    } else {
      this.carsService.addToFavorites(carId).subscribe(() => {
        this.favoriteCars.add(carId);
        this.updateCarLikeStatus(carId, true);
      });
    }
  }

  updateCarLikeStatus(carId: number, liked: boolean): void {
    this.cars = this.cars.map((car) =>
      car.id === carId ? { ...car, liked } : car
    );
  }

  applyFilter(): void {
    this.loadCars(); // Перезагрузить список автомобилей с новыми фильтрами
  }
}