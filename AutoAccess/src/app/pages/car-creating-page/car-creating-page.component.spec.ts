import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarCreatingPageComponent } from './car-creating-page.component';
import { CarsService } from '../../services/cars/cars.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';

describe('CarCreatingPageComponent', () => {
  let component: CarCreatingPageComponent;
  let fixture: ComponentFixture<CarCreatingPageComponent>;
  let mockCarsService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockCarsService = {
      createCar: jasmine.createSpy('createCar').and.returnValue(of({}))
    };
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      declarations: [CarCreatingPageComponent, NavBarComponent],
      imports: [FormsModule],
      providers: [
        { provide: CarsService, useValue: mockCarsService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarCreatingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a car successfully', () => {
    component.formData.marka = 'Hyundai';
    component.formData.model = 'Sonata';
    component.handleSubmit(new Event('submit'));
    expect(mockCarsService.createCar).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/cars']);
  });

  it('should display error if user is not logged in', () => {
    spyOn(window, 'alert');
    spyOn(component, 'getUserName').and.returnValue(null);
    component.handleSubmit(new Event('submit'));
    expect(window.alert).toHaveBeenCalledWith('Please log in to create a car post.');
  });
});
