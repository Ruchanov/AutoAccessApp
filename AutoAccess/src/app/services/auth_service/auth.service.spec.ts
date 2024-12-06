import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should send login request', () => {
    const mockResponse = { access: 'token', refresh: 'refresh' };
    service.login('username', 'password').subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://127.0.0.1:8000/token/');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username: 'username', password: 'password' });
    req.flush(mockResponse);
  });

  it('should save tokens in localStorage', () => {
    spyOn(localStorage, 'setItem');
    service.setTokens('access_token', 'refresh_token', 'username');
    expect(localStorage.setItem).toHaveBeenCalledWith('access_token', 'access_token');
    expect(localStorage.setItem).toHaveBeenCalledWith('refresh_token', 'refresh_token');
    expect(localStorage.setItem).toHaveBeenCalledWith('username', 'username');
  });

  it('should clear tokens from localStorage', () => {
    spyOn(localStorage, 'removeItem');
    service.clearTokens();
    expect(localStorage.removeItem).toHaveBeenCalledWith('access_token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('refresh_token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('user_id');
  });
});
