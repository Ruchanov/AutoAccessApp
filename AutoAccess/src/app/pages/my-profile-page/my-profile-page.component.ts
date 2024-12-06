import { Component } from '@angular/core';
import { ProfileService } from '../../services/profile_service/profile.service';

@Component({
  selector: 'app-my-profile-page',
  templateUrl: './my-profile-page.component.html',
  styleUrl: './my-profile-page.component.css'
})
export class MyProfilePageComponent {
  userName: string = '';
  userPosts: any[] = [];

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadProfile();
    this.loadUserPosts();
  }

  // Загрузка данных профиля
  loadProfile(): void {
    this.userName = localStorage.getItem('username') || '';
  }

  // Загрузка постов пользователя
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
