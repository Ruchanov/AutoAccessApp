import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainPageComponent } from './main-page.component';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Мокаем Router
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [MainPageComponent],
      providers: [{ provide: Router, useValue: mockRouter }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA], // Подключаем, чтобы игнорировать неизвестные элементы
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to buy car page', () => {
    component.navigateToBuyCar();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/cars']);
  });

  it('should navigate to list car page', () => {
    component.navigateToListCar();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/my-profile']);
  });
});
