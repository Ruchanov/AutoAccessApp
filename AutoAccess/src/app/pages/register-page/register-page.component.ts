import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { nonAuthUser } from '../../models';
import { InputsCheckerDirective } from '../../directives/password-length-checker/inputs-checker.directive';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  newUser: nonAuthUser = { username: '', email: '', password: '' };

  constructor(private router: Router) { }

  onSubmit() {
    if(this.isFormValid()){
      console.log(`Username: ${this.newUser.username}, Email: ${this.newUser.email}, Password: ${this.newUser.password}`);
      this.router.navigate(['/login']);
    }else{
      alert('Форма заполнена некорректно. Проверьте данные и попробуйте снова.');
    }
  }

  isFormValid(): boolean {
    return this.newUser.username.length > 0 && 
           this.newUser.email.includes('@') &&
           this.newUser.password.length >= 8;
  }
  
  toggleForm() {
    this.router.navigate(['/login']);
  }
}
