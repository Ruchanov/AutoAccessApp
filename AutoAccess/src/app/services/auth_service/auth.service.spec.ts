import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should set tokens correctly', () => {
    spyOn(localStorage, 'setItem');
    const validJwt =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxfQ.sQmJBEXPsDxwq45sA9a5Z6glEF9C1PpEJcA5ByT79tk';
    const access = validJwt;
    const refresh = 'refresh_token';
    const username = 'testuser';

    service.setTokens(access, refresh, username);

    expect(localStorage.setItem).toHaveBeenCalledWith('access_token', access);
    expect(localStorage.setItem).toHaveBeenCalledWith('refresh_token', refresh);
    expect(localStorage.setItem).toHaveBeenCalledWith('username', username);
    expect(localStorage.setItem).toHaveBeenCalledWith('user_id', '1');
  });

  it('should clear tokens', () => {
    spyOn(localStorage, 'removeItem');

    service.clearTokens();

    expect(localStorage.removeItem).toHaveBeenCalledWith('access_token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('refresh_token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('user_id');
  });
});
