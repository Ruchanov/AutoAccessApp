import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CarsService } from './cars.service';
import { Car } from '../../models';

describe('CarsService', () => {
  let service: CarsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CarsService],
    });
    service = TestBed.inject(CarsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  const mockFavorites: Car[] = [
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
      liked: true,
      phoneNumber: '1234567890',
    },
    {
      id: 2,
      name: 'Car 2',
      marka: 'Honda',
      model: 'Civic',
      year: 2019,
      price: 18000,
      mileage: 20000,
      body_type: 'Coupe',
      transmission: 'Manual',
      image: 'path/to/image.jpg',
      description: 'A sporty car.',
      liked: false,
      phoneNumber: '0987654321',
    },
  ];

  it('should fetch all cars', () => {
    service.getCars({}).subscribe((cars) => {
      expect(cars).toEqual(mockFavorites);
    });

    const req = httpMock.expectOne('http://127.0.0.1:8000/cars/');
    expect(req.request.method).toBe('GET');
    req.flush(mockFavorites);
  });

  it('should handle HTTP error for fetching cars', () => {
    service.getCars({}).subscribe({
      next: () => fail('Should have failed with 500 error'),
      error: (error) => expect(error.status).toBe(500),
    });

    const req = httpMock.expectOne('http://127.0.0.1:8000/cars/');
    expect(req.request.method).toBe('GET');
    req.flush(null, { status: 500, statusText: 'Internal Server Error' });
  });

});
