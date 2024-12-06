import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarsService } from '../../services/cars/cars.service';
import { CarFormData } from '../../models';

@Component({
  selector: 'app-car-creating-page',
  templateUrl: './car-creating-page.component.html',
  styleUrls: ['./car-creating-page.component.css']
})
export class CarCreatingPageComponent {
  formData: CarFormData = {
    marka: '',
    model: '',
    year: null,
    price: null,
    mileage: null,
    body_type: '',
    transmission: '',
    description: '',
    image: null,
    phoneNumber: '',
  };

  constructor(private carsService: CarsService, private router: Router) {}

  // Функция getUserId
  getUserId(): number | null {
    const userId = localStorage.getItem('user_id');
    return userId ? parseInt(userId, 10) : null;
  }

  handleImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.formData.image = input.files[0];
    }
  }

  handleSubmit(event: Event): void {
    event.preventDefault();

    const data = new FormData();
    (Object.keys(this.formData) as Array<keyof CarFormData>).forEach((key) => {
      if (key === 'image' && this.formData.image) {
        data.append('image', this.formData.image);
      } else if (this.formData[key] !== null) {
        data.append(key, String(this.formData[key]));
      }
    });

    const userId = this.getUserId();
    if (!userId) {
      console.error('User ID is missing. Please log in.');
      alert('Please log in to create a car post.');
      return;
    }

    data.append('user', userId.toString());

    data.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    this.carsService.createCar(data).subscribe({
      next: (response) => {
        console.log('Car created successfully:', response);
        this.router.navigate(['/cars']);
      },
      error: (error) => {
        console.error('Error creating car:', error);
      },
    });
  }
}
