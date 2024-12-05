import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  logo = '../assets/logo.png'; // Укажите путь к логотипу
  isLoggedIn = false;

  constructor(private router: Router) {}

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  ngOnInit() {
    if (this.isBrowser()) {
      this.isLoggedIn = !!localStorage.getItem('access_token');
      window.addEventListener('storage', this.handleStorageChange.bind(this));
    }
  }

  ngOnDestroy() {
    if (this.isBrowser()) {
      window.removeEventListener('storage', this.handleStorageChange.bind(this));
    }
  }

  handleStorageChange() {
    if (this.isBrowser()) {
      this.isLoggedIn = !!localStorage.getItem('access_token');
    }
  }

  handleLogout() {
    if (this.isBrowser()) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_id');
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
    }
  }
}
