import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';
  showError: boolean = false;
  loginAttempts: number = 0;

  mockUsers = [
    { email: 'user1@mail.ru', password: 'pass123456' },
    { email: 'user1@gmail.com', password: 'pass123456' },
  ];

  constructor(private router: Router) { }

  onSubmit() {
    const user = this.mockUsers.find(
      (user) => user.email === this.email && user.password === this.password
    );

    if (user) {
      console.log(`Email: ${this.email}, Password: ${this.password}`);
      this.router.navigate(['/main']);
      this.showError = false;
    } else {
      this.email = '';
      this.password = '';
      this.showError = true;
      this.loginAttempts++; 
    }

  }

  isFormValid(): boolean {
    return this.email.length > 0 &&
      this.password.length > 0;
  }

  toggleForm() {
    // Переключение на форму регистрации
    this.router.navigate(['/register']);
  }
}
