import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPageComponent } from './login-page.component';
import { AuthService } from '../../services/auth_service/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let mockAuthService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockAuthService = {
      login: jasmine.createSpy('login').and.returnValue(of({ access: 'token', refresh: 'refresh' })),
      setTokens: jasmine.createSpy('setTokens'),
    };
    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [FormsModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should login successfully', () => {
    component.username = 'test';
    component.password = 'password';
    component.onSubmit();
    expect(mockAuthService.login).toHaveBeenCalledWith('test', 'password');
    expect(mockAuthService.setTokens).toHaveBeenCalledWith('token', 'refresh', 'test'); // Убедитесь, что аргументы корректны
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/cars']);
  });
  
  it('should handle login error', () => {
    mockAuthService.login.and.returnValue(throwError(() => ({ error: 'Invalid credentials' })));
    component.onSubmit();
    fixture.detectChanges();
    expect(component.errorMessage).toBe('Invalid username or password.');
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
  
});
