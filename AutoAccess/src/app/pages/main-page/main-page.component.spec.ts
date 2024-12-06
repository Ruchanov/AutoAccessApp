import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainPageComponent } from './main-page.component';
import { Router } from '@angular/router';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../components/footer/footer.component';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let mockRouter: any;

  beforeEach(async () => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      declarations: [MainPageComponent, NavBarComponent, FooterComponent],
      providers: [{ provide: Router, useValue: mockRouter }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should navigate to buy car page', () => {
    component.navigateToBuyCar();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/cars']);
  });

  it('should navigate to list car page', () => {
    component.navigateToListCar();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/createcar']);
  });
});
