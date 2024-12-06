import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-credit-calculator',
  templateUrl: './credit-calculator.component.html',
  styleUrls: ['./credit-calculator.component.css']
})
export class CreditCalculatorComponent implements OnInit {
  @Input() defaultPrice!: number;
  price!: number;
  downPayment: number = 1000000;
  term: string = '12';
  monthlyPayment: string | null = null;
  isDownPaymentValid: boolean = true;

  ngOnInit(): void {
    this.price = this.defaultPrice;
    this.calculateMonthlyPayment();
  }

  calculateMonthlyPayment(): void {
    this.isDownPaymentValid = this.downPayment >= 1000000 && this.downPayment <= this.price;

    if (this.isDownPaymentValid) {
      const loanAmount = this.price - this.downPayment;
      const monthlyInterestRate = 0.16 / 12; // Примерная процентная ставка в месяц
      const numberOfPayments = parseInt(this.term, 10);
      const monthlyPayment =
        loanAmount *
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

      this.monthlyPayment = monthlyPayment.toFixed(2);
    } else {
      this.monthlyPayment = null;
    }
  }
}
