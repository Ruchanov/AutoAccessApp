import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarDetailPageComponent } from './car-detail-page.component';
import { CarsService } from '../../services/cars/cars.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { CreditCalculatorComponent } from '../../components/credit-calculator/credit-calculator.component';
import { FormsModule } from '@angular/forms';

describe('CarDetailPageComponent', () => {
  let component: CarDetailPageComponent;
  let fixture: ComponentFixture<CarDetailPageComponent>;
  let mockCarsService: any;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockCarsService = {
      getCarById: jasmine.createSpy('getCarById').and.returnValue(of({ id: 1, marka: 'Test' })),
    };
    mockActivatedRoute = {
      snapshot: { paramMap: { get: () => '1' } },
    };

    await TestBed.configureTestingModule({
      declarations: [CarDetailPageComponent, NavBarComponent, CreditCalculatorComponent],
      imports: [FormsModule],
      providers: [
        { provide: CarsService, useValue: mockCarsService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load car details on init', () => {
    expect(mockCarsService.getCarById).toHaveBeenCalledWith(1);
    expect(component.car?.marka).toBe('Test');
  });
});
