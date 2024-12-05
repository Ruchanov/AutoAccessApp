import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth_service/auth.service';
import { NonAuthUser } from '../../models';
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  newUser: NonAuthUser = { username: '', email: '', password: '', passwordConfirmation: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const registrationData = {
      username: this.newUser.username,
      email: this.newUser.email,
      password: this.newUser.password,
      password2: this.newUser.passwordConfirmation
    };

    this.authService.register(registrationData).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (error) => {
        console.error('Registration failed:', error);
        this.errorMessage = error.error?.detail || 'Registration failed. Please try again.';
      }
    });
  }

  isFormValid(): boolean {
    return this.newUser.username.trim().length > 0 &&
           this.newUser.email.includes('@') &&
           this.newUser.password.length >= 8 &&
           this.newUser.password === this.newUser.passwordConfirmation;
  }

  toggleForm() {
    this.router.navigate(['/login']);
  }
}
