import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileService]
    });
    service = TestBed.inject(ProfileService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch profile data', () => {
    const mockProfile = { username: 'testUser' };
    service.getProfile().subscribe((profile) => {
      expect(profile).toEqual(mockProfile);
    });

    const req = httpMock.expectOne('http://127.0.0.1:8000/profile');
    expect(req.request.method).toBe('GET');
    req.flush(mockProfile);
  });

  it('should fetch user posts', () => {
    const mockPosts = [{ id: 1, title: 'Test Post' }];
    service.getUserPosts().subscribe((posts) => {
      expect(posts).toEqual(mockPosts);
    });

    const req = httpMock.expectOne('http://127.0.0.1:8000/cars/user_posts/');
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });
});
