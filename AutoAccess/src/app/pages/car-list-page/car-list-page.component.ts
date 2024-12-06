import { Component, OnInit } from '@angular/core';
import { CarsService } from '../../services/cars/cars.service';
import { Car } from '../../models';

@Component({
  selector: 'app-car-list-page',
  templateUrl: './car-list-page.component.html',
  styleUrls: ['./car-list-page.component.css']
})
export class CarListPageComponent implements OnInit {
  cars: Car[] = [];
  searchQuery: string = '';
  isFilterVisible: boolean = false;

  filterParams = {
    min_price: '',
    max_price: '',
    min_mileage: '',
    max_mileage: '',
    min_year: '',
    max_year: ''
  };

  favoriteCars: Set<number> = new Set();

  constructor(private carsService: CarsService) {}

  ngOnInit(): void {
    // this.loadFavorites();
    this.loadCars();
  }

  toggleFilter(): void {
    this.isFilterVisible = !this.isFilterVisible;
  }

  loadFavorites(): void {
    this.carsService.getFavorites().subscribe((favoriteCars) => {
      // Создаем Set для хранения ID избранных автомобилей
      this.favoriteCars = new Set(favoriteCars.map((car) => car.id));
    });
  }

  loadCars(): void {
    const params = { ...this.filterParams, search: this.searchQuery };
  
    // Загружаем все автомобили
    this.carsService.getCars(params).subscribe((cars) => {
      // Загружаем список избранных автомобилей
      this.carsService.getFavorites().subscribe((favoriteCars) => {
        const favoriteIds = new Set(favoriteCars.map((car) => car.id)); // Собираем ID избранных автомобилей
  
        // Обновляем список машин с учетом избранных
        this.cars = cars.map((car) => ({
          ...car,
          liked: favoriteIds.has(car.id), // Отмечаем, если машина в избранном
        }));
  
        // Обновляем локальный Set избранных машин
        this.favoriteCars = favoriteIds;
      });
    });
  }

  toggleLike(carId: number): void {
    if (this.favoriteCars.has(carId)) {
      // Удаляем из избранного
      this.carsService.removeFromFavorites(carId).subscribe(() => {
        this.favoriteCars.delete(carId); // Удаляем из локального списка
        this.updateCarLikeStatus(carId, false); // Обновляем состояние лайка в списке
      });
    } else {
      // Добавляем в избранное
      this.carsService.addToFavorites(carId).subscribe(() => {
        this.favoriteCars.add(carId); // Добавляем в локальный список
        this.updateCarLikeStatus(carId, true); // Обновляем состояние лайка в списке
      });
    }
  }

  updateCarLikeStatus(carId: number, liked: boolean): void {
    console.log(`Обновляем статус лайка для машины ID ${carId}: ${liked}`);
    this.cars = this.cars.map((car) =>
      car.id === carId ? { ...car, liked } : car
    );
  }

  applyFilter(): void {
    this.loadCars();
  }
}
