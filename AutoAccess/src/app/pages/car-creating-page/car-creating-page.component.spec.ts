import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarCreatingPageComponent } from './car-creating-page.component';
import { CarsService } from '../../services/cars/cars.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('CarCreatingPageComponent', () => {
  let component: CarCreatingPageComponent;
  let fixture: ComponentFixture<CarCreatingPageComponent>;
  let mockCarsService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockCarsService = {
      createCar: jasmine.createSpy('createCar').and.returnValue(of({ success: true })),
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    await TestBed.configureTestingModule({
      declarations: [CarCreatingPageComponent],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        { provide: CarsService, useValue: mockCarsService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarCreatingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.carForm).toBeDefined();
    expect(component.carForm.controls['marka']).toBeTruthy();
    expect(component.carForm.controls['model']).toBeTruthy();
    expect(component.carForm.controls['year']).toBeTruthy();
    expect(component.carForm.controls['price']).toBeTruthy();
    expect(component.carForm.controls['mileage']).toBeTruthy();
  });

  it('should set the image file on file change', () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const event = { target: { files: [file] } };

    component.onFileChange(event as any);
    expect(component.imageFile).toBe(file);
  });

  it('should submit the form successfully', () => {
    // Mock form values
    component.carForm.setValue({
      marka: 'Toyota',
      model: 'Corolla',
      year: 2022,
      price: 25000,
      mileage: 15000,
      body_type: 'Sedan',
      transmission: 'Automatic',
      description: 'A reliable car.',
      phoneNumber: '123456789',
    });

    const userId = 1;
    spyOn(localStorage, 'getItem').and.returnValue(userId.toString());

    component.submitForm();

    expect(mockCarsService.createCar).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should not submit the form if invalid', () => {
    component.carForm.setValue({
      marka: '',
      model: '',
      year: null,
      price: null,
      mileage: null,
      body_type: '',
      transmission: '',
      description: '',
      phoneNumber: '',
    });

    component.submitForm();

    expect(mockCarsService.createCar).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should handle errors on form submission', () => {
    mockCarsService.createCar.and.returnValue(throwError(() => new Error('Error creating car')));

    component.carForm.setValue({
      marka: 'Toyota',
      model: 'Corolla',
      year: 2022,
      price: 25000,
      mileage: 15000,
      body_type: 'Sedan',
      transmission: 'Automatic',
      description: 'A reliable car.',
      phoneNumber: '123456789',
    });

    spyOn(console, 'error');

    component.submitForm();

    expect(mockCarsService.createCar).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error creating car:', jasmine.any(Error));
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
