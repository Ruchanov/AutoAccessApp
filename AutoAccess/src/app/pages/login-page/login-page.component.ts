import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth_service/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  loginAttempts: number = 0;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        console.log(response)
        this.authService.setTokens(response.access, response.refresh, this.username);
        this.router.navigate(['/cars']);
      },
      error: () => {
        this.errorMessage = 'Invalid username or password.';
        this.loginAttempts++;
      }
    });
  }

  isFormValid(): boolean {
    return this.username.trim().length > 0 && this.password.trim().length > 0;
  }

  toggleForm() {
    this.router.navigate(['/register']);
  }
}
