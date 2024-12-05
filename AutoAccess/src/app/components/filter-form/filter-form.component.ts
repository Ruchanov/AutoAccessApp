import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css']
})
export class FilterFormComponent {
  @Input() filterParams: any = {
    min_price: '',
    max_price: '',
    min_mileage: '',
    max_mileage: '',
    min_year: '',
    max_year: ''
  };
  @Output() filterChange = new EventEmitter<any>();
  @Output() applyFilter = new EventEmitter<void>();

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filterParams[input.name] = input.value;
    this.filterChange.emit(this.filterParams);
  }

  onApplyFilter(): void {
    this.applyFilter.emit();
  }
}
