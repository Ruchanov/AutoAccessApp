import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarListPageComponent } from './car-list-page.component';
import { CarsService } from '../../services/cars/cars.service';
import { of } from 'rxjs';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { SearchFormComponent } from '../../components/search-form/search-form.component';
import { FilterFormComponent } from '../../components/filter-form/filter-form.component';
import { CarItemComponent } from '../../components/car-item/car-item.component';
import { By } from '@angular/platform-browser';

describe('CarListPageComponent', () => {
  let component: CarListPageComponent;
  let fixture: ComponentFixture<CarListPageComponent>;
  let mockCarsService: any;

  beforeEach(async () => {
    mockCarsService = {
      getCars: jasmine.createSpy('getCars').and.returnValue(
        of([
          {
            id: 1,
            name: 'Car 1',
            marka: 'Toyota',
            model: 'Corolla',
            year: 2020,
            price: 20000,
            mileage: 15000,
            body_type: 'Sedan',
            transmission: 'Automatic',
            image: 'path/to/image.jpg',
            description: 'A reliable car.',
            liked: false,
            phoneNumber: '1234567890',
          },
        ])
      ),
      getFavorites: jasmine.createSpy('getFavorites').and.returnValue(
        of([{ id: 1 }])
      ),
      addToFavorites: jasmine.createSpy('addToFavorites').and.returnValue(of(null)),
      removeFromFavorites: jasmine.createSpy('removeFromFavorites').and.returnValue(of(null)),
    };

    await TestBed.configureTestingModule({
      declarations: [
        CarListPageComponent,
        NavBarComponent,
        SearchFormComponent,
        FilterFormComponent,
        CarItemComponent,
      ],
      providers: [{ provide: CarsService, useValue: mockCarsService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load cars and favorites on init', () => {
    component.ngOnInit();
    expect(mockCarsService.getCars).toHaveBeenCalled();
    expect(mockCarsService.getFavorites).toHaveBeenCalled();
    expect(component.cars.length).toBe(1);
    expect(component.favoriteCars.has(1)).toBeTrue();
    expect(component.cars[0].liked).toBeTrue();
  });

  it('should toggle like on a car (add to favorites)', () => {
    component.toggleLike(2);
    expect(mockCarsService.addToFavorites).toHaveBeenCalledWith(2);
    expect(mockCarsService.removeFromFavorites).not.toHaveBeenCalled();
  });

  it('should toggle like on a car (remove from favorites)', () => {
    component.favoriteCars.add(1); // Simulate car 1 is already a favorite
    component.toggleLike(1);
    expect(mockCarsService.removeFromFavorites).toHaveBeenCalledWith(1);
    expect(mockCarsService.addToFavorites).not.toHaveBeenCalled();
  });

  it('should update car like status', () => {
    component.cars = [
      {
        id: 1,
        name: 'Car 1',
        marka: 'Toyota',
        model: 'Corolla',
        year: 2020,
        price: 20000,
        mileage: 15000,
        body_type: 'Sedan',
        transmission: 'Automatic',
        image: 'path/to/image.jpg',
        description: 'A reliable car.',
        liked: false,
        phoneNumber: '1234567890',
      },
    ];
    component.updateCarLikeStatus(1, true);
    expect(component.cars[0].liked).toBeTrue();
  });

  it('should apply filters and load cars', () => {
    component.filterParams = { min_price: '10000', max_price: '', min_mileage: '', max_mileage: '', min_year: '', max_year: '' };
    component.applyFilter();
    expect(mockCarsService.getCars).toHaveBeenCalledWith({
      search: '',
      min_price: '10000',
      max_price: '',
      min_mileage: '',
      max_mileage: '',
      min_year: '',
      max_year: '',
    });
  });

  it('should toggle filter visibility', () => {
    expect(component.isFilterVisible).toBeFalse();
    component.toggleFilter();
    expect(component.isFilterVisible).toBeTrue();
  });
});
