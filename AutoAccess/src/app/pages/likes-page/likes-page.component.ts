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
    this.carsService.getFavorites().subscribe((favoriteIds) => {
      this.carsService.getCars({ ids: favoriteIds.join(',') }).subscribe((cars) => {
        this.favoriteCars = cars;
      });
    });
  }

  removeFromFavorites(carId: number): void {
    this.carsService.removeFromFavorites(carId).subscribe(() => {
      this.favoriteCars = this.favoriteCars.filter(car => car.id !== carId);
    });
  }
}
