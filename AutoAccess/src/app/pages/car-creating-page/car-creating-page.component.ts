import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarsService } from '../../services/cars/cars.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarFormData } from '../../models';
// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { CarsService } from '../../services/cars.service';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-car-creating-page',
  templateUrl: './car-creating-page.component.html',
  styleUrls: ['./car-creating-page.component.css']
})
export class CarCreatingPageComponent {
  carForm: FormGroup;
  imageFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private carsService: CarsService,
    private router: Router
  ) {
    this.carForm = this.fb.group({
      marka: ['', Validators.required],
      model: ['', Validators.required],
      year: [null, Validators.required],
      price: [null, Validators.required],
      mileage: [null, Validators.required],
      body_type: ['', Validators.required],
      transmission: ['', Validators.required],
      description: [''],
      phoneNumber: ['', Validators.required],
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
    }
  }

  submitForm(): void {
    if (this.carForm.invalid) {
      return;
    }

    const formData = new FormData();
    Object.keys(this.carForm.value).forEach((key) => {
      if (this.carForm.value[key] !== null) {
        formData.append(key, this.carForm.value[key]);
      }
    });

    const userId = parseInt(localStorage.getItem('user_id') || '0', 10);
    formData.append('user', userId.toString());

    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }

    this.carsService.createCar(formData).subscribe(
      (response) => {
        console.log('Car created successfully:', response);
        this.router.navigate(['/']); // Redirect to homepage or another route
      },
      (error) => {
        console.error('Error creating car:', error);
      }
    );
  }
}
