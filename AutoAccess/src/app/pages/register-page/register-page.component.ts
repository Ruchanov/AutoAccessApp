import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  username : string = '';
  email : string = '';
  password : string = '' ;

  constructor(private router: Router) {}

  onSubmit() {
    // Логика регистрации пользователя
    console.log(`Username: ${this.username}, Email: ${this.email}, Password: ${this.password}`);
    // После успешной регистрации перенаправляем
    this.router.navigate(['/dashboard']);
  }

  toggleForm() {
    // Переключение на форму входа
    this.router.navigate(['/login']);
  }
}
