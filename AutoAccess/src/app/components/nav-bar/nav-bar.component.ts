import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  logo = '../assets/logo.png'; // Укажи правильный путь к логотипу
  isLoggedIn = true;

  constructor(private router: Router) {}

  ngOnInit() {
    // window.addEventListener('storage', this.handleStorageChange.bind(this));
  }

  ngOnDestroy() {
    // window.removeEventListener('storage', this.handleStorageChange.bind(this));
  }

  handleStorageChange() {
    // this.isLoggedIn = !!localStorage.getItem('access_token');
  }

  handleLogout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_id');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}