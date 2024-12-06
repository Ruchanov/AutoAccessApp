import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LikesPageComponent } from './likes-page.component';
import { CarsService } from '../../services/cars/cars.service';
import { of } from 'rxjs';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';

describe('LikesPageComponent', () => {
  let component: LikesPageComponent;
  let fixture: ComponentFixture<LikesPageComponent>;
  let mockCarsService: any;

  beforeEach(async () => {
    mockCarsService = {
      getFavorites: jasmine.createSpy('getFavorites').and.returnValue(of([{ id: 1, marka: 'Test' }])),
      removeFromFavorites: jasmine.createSpy('removeFromFavorites').and.returnValue(of({}))
    };

    await TestBed.configureTestingModule({
      declarations: [LikesPageComponent, NavBarComponent],
      providers: [{ provide: CarsService, useValue: mockCarsService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load favorite cars on init', () => {
    expect(mockCarsService.getFavorites).toHaveBeenCalled();
    expect(component.favoriteCars.length).toBe(1);
  });

  it('should remove car from favorites', () => {
    component.removeFromFavorites(1);
    expect(mockCarsService.removeFromFavorites).toHaveBeenCalledWith(1);
    expect(component.favoriteCars.length).toBe(0);
  });
});
