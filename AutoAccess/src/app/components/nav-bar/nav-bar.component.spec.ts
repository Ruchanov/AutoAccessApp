import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavBarComponent } from './nav-bar.component';
import { Router } from '@angular/router';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLoggedIn based on localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('token');
    component.ngOnInit();
    expect(component.isLoggedIn).toBeTrue();
  });

  it('should call handleLogout and clear localStorage', () => {
    const routerSpy = spyOn(TestBed.inject(Router), 'navigate');
    spyOn(localStorage, 'removeItem');

    component.handleLogout();

    expect(localStorage.removeItem).toHaveBeenCalledWith('access_token');
    expect(routerSpy).toHaveBeenCalledWith(['/login']);
  });
});
