import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarItemComponent } from './car-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('CarItemComponent', () => {
  let component: CarItemComponent;
  let fixture: ComponentFixture<CarItemComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarItemComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarItemComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    component.car = {
      id: 1,
      name: 'Test Car',
      marka: 'Hyundai',
      model: 'Sonata',
      year: 2020,
      price: 20000,
      mileage: 50000,
      body_type: 'Sedan',
      transmission: 'Automatic',
      image: 'test-image.jpg',
      description: 'A reliable car for testing.',
      liked: false,
      phoneNumber: '123456789',
    };
    component.isFavorite = false;
    fixture.detectChanges();
  });

  it('should display car details', () => {
    const carDetails = fixture.debugElement.query(By.css('.carInfo'));
    expect(carDetails.nativeElement.textContent).toContain('Hyundai');
    expect(carDetails.nativeElement.textContent).toContain('Sonata');
    expect(carDetails.nativeElement.textContent).toContain('2020');
  });

  it('should emit likeToggle event on toggleLike', () => {
    spyOn(component.likeToggle, 'emit');
    const likeButton = fixture.debugElement.query(By.css('.likeIcon'));
    likeButton.triggerEventHandler('click', new Event('click'));
    fixture.detectChanges();
    expect(component.likeToggle.emit).toHaveBeenCalledWith(component.car.id); // Проверяем ID автомобиля
  });
  
  it('should navigate to detail page on openDetail', () => {
    spyOn(router, 'navigate');
    component.openDetail();
    expect(router.navigate).toHaveBeenCalledWith(['/cars', 1]);
  });
});
