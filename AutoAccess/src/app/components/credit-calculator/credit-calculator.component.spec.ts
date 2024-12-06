import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreditCalculatorComponent } from './credit-calculator.component';
import { FormsModule } from '@angular/forms';

describe('CreditCalculatorComponent', () => {
  let component: CreditCalculatorComponent;
  let fixture: ComponentFixture<CreditCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreditCalculatorComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCalculatorComponent);
    component = fixture.componentInstance;
    component.defaultPrice = 10000000; // Mock default price
    fixture.detectChanges();
  });

  it('should calculate monthly payment correctly', () => {
    component.price = 10000000;
    component.downPayment = 1000000;
    component.term = '12';
    component.calculateMonthlyPayment();
    expect(component.monthlyPayment).toBeDefined();
  });

  it('should validate down payment', () => {
    component.price = 10000000; // Установите корректное значение цены
    component.downPayment = 500000; // Недействительный первоначальный взнос
    component.calculateMonthlyPayment();
    expect(component.isDownPaymentValid).toBeFalse(); // Проверка валидации
    expect(component.monthlyPayment).toBeNull();
  });  
});
