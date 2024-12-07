import { Component } from '@angular/core';
import { ProfileService } from '../../services/profile_service/profile.service';

@Component({
  selector: 'app-my-profile-page',
  templateUrl: './my-profile-page.component.html',
  styleUrls: ['./my-profile-page.component.css'],
})
export class MyProfilePageComponent {
  userName: string = '';
  userPosts: any[] = [];

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadProfile();
    this.loadUserPosts();
  }

  loadProfile(): void {
    this.userName = localStorage.getItem('username') || '';
  }

  loadUserPosts(): void {
    this.profileService.getUserPosts().subscribe(
      (data) => {
        this.userPosts = data;
      },
      (error) => {
        console.error('Error fetching user posts:', error);
      }
    );
  }
}
