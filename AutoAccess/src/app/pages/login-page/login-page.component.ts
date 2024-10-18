import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  email : string = '';
  password : string = '';

  constructor(private router: Router) {}

  onSubmit() {
    // Логика авторизации пользователя
    console.log(`Email: ${this.email}, Password: ${this.password}`);
    // После успешной авторизации перенаправляем
    this.router.navigate(['/dashboard']);
  }

  toggleForm() {
    // Переключение на форму регистрации
    this.router.navigate(['/register']);
  }
}
