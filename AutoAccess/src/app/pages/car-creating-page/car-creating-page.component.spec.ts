import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarCreatingPageComponent } from './car-creating-page.component';

describe('CarCreatingPageComponent', () => {
  let component: CarCreatingPageComponent;
  let fixture: ComponentFixture<CarCreatingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarCreatingPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarCreatingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
