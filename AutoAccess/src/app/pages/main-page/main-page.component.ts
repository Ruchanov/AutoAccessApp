import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  logo2 = '../assets/logo2_1.png'
  constructor(private router: Router) {}

  navigateToBuyCar(): void {
    this.router.navigate(['/cars']); 
  }

  navigateToListCar(): void {
    this.router.navigate(['/createcar']); 
  }
}
