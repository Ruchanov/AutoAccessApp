import { Component, OnInit } from '@angular/core';
import { CarsService } from '../../services/cars/cars.service';
import { Car } from '../../models';

@Component({
  selector: 'app-likes-page',
  templateUrl: './likes-page.component.html',
  styleUrls: ['./likes-page.component.css']
})
export class LikesPageComponent implements OnInit {
  favoriteCars: Car[] = [];

  constructor(private carsService: CarsService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }


  loadFavorites(): void {
    this.carsService.getFavorites().subscribe((favoriteCars) => {
      this.favoriteCars = favoriteCars.map((car) => ({
        ...car,
        liked: true, // Отмечаем машины как избранные
      }));
    });
  }

  removeFromFavorites(carId: number): void {
    // Удаляем машину из списка избранных
    this.favoriteCars = this.favoriteCars.filter((car) => car.id !== carId);

    // Вызываем сервис для удаления из избранного (предполагается, что сервис поддерживает этот метод)
    this.carsService.removeFromFavorites(carId).subscribe(() => {
      console.log(`Car with ID ${carId} removed from favorites`);
    });
  }
}
