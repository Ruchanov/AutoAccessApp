import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from '../../models';

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.css']
})
export class CarItemComponent {
  @Input() car!: Car;
  @Input() isFavorite: boolean = false;
  @Output() likeToggle = new EventEmitter<number>();

  constructor(private router: Router) {}

  openDetail(): void {
    this.router.navigate(['/cars', this.car.id]);
  }

  isLiked(car: Car): boolean {
    return !!car.liked; // Преобразует undefined в false
  }
  

  toggleLike(event: Event): void {
    event.stopPropagation(); // Остановить всплытие события
    this.likeToggle.emit(this.car.id);
  }
}
