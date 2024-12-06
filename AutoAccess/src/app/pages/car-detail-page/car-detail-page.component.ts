import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarsService } from '../../services/cars/cars.service';
import { Car } from '../../models';

@Component({
  selector: 'app-car-detail-page',
  templateUrl: './car-detail-page.component.html',
  styleUrls: ['./car-detail-page.component.css']
})
export class CarDetailPageComponent implements OnInit {
  car: Car | null = null;

  constructor(private route: ActivatedRoute, private carsService: CarsService) {}

  ngOnInit(): void {
    const carId = this.route.snapshot.paramMap.get('id');
    if (carId) {
      this.loadCarDetails(+carId);
    }
  }

  loadCarDetails(carId: number): void {
    this.carsService.getCarById(carId).subscribe({
      next: (car) => {
        this.car = car;
      },
      error: (error) => {
        console.error('Ошибка при загрузке деталей автомобиля:', error);
      }
    });
  }
}
