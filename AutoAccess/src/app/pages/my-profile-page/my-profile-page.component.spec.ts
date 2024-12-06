import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyProfilePageComponent } from './my-profile-page.component';
import { ProfileService } from '../../services/profile_service/profile.service';
import { of } from 'rxjs';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';

describe('MyProfilePageComponent', () => {
  let component: MyProfilePageComponent;
  let fixture: ComponentFixture<MyProfilePageComponent>;
  let mockProfileService: any;

  beforeEach(async () => {
    mockProfileService = {
      getUserPosts: jasmine.createSpy('getUserPosts').and.returnValue(of([{ id: 1, title: 'Test Post' }]))
    };

    await TestBed.configureTestingModule({
      declarations: [MyProfilePageComponent, NavBarComponent],
      providers: [{ provide: ProfileService, useValue: mockProfileService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load profile and posts on init', () => {
    spyOn(localStorage, 'getItem').and.returnValue('testUser');
    component.ngOnInit();
    expect(component.userName).toBe('testUser');
    expect(mockProfileService.getUserPosts).toHaveBeenCalled();
    expect(component.userPosts.length).toBe(1);
  });
});
