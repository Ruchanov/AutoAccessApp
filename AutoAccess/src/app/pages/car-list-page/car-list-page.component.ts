import { Component } from '@angular/core';

@Component({
  selector: 'app-car-list-page',
  templateUrl: './car-list-page.component.html',
  styleUrls: ['./car-list-page.component.css']
})
export class CarListPageComponent {
  cars = [
    { 
      id: 1, 
      name: 'Tesla Model S', 
      imageUrl: '../assets/tesla.jpeg', 
      description: 'Electric car with great performance.', 
      price: '$80,000',
      liked: false 
    },
    { 
      id: 2, 
      name: 'Audi A8', 
      imageUrl: '../assets/audi.jpg', 
      description: 'Luxury sedan with smooth driving experience.', 
      price: '$70,000',
      liked: false 
    },
    { 
      id: 3, 
      name: 'BMW X5', 
      imageUrl: '../assets/bmw.webp', 
      description: 'Sporty SUV with powerful engine.', 
      price: '$60,000',
      liked: false 
    }
  ];

  toggleLike(car: any) {
    car.liked = !car.liked;
  }
}
