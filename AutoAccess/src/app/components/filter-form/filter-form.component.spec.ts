import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FilterFormComponent } from './filter-form.component';

describe('FilterFormComponent', () => {
  let component: FilterFormComponent;
  let fixture: ComponentFixture<FilterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit filterChange event on input change', () => {
    spyOn(component.filterChange, 'emit');
    const input = fixture.debugElement.query(By.css('input[name="min_price"]'));
    expect(input).toBeTruthy(); // Ensure the input exists
    input.nativeElement.value = 10000;
    input.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.filterChange.emit).toHaveBeenCalledWith({
      min_price: '10000',
      max_price: '',
      min_mileage: '',
      max_mileage: '',
      min_year: '',
      max_year: ''
    });
  });

  it('should emit applyFilter event on apply filter button click', () => {
    spyOn(component.applyFilter, 'emit');
    const button = fixture.debugElement.query(By.css('.applyFilterButton'));
    expect(button).toBeTruthy(); // Ensure the button exists
    button.triggerEventHandler('click', {});
    fixture.detectChanges();
    expect(component.applyFilter.emit).toHaveBeenCalled();
  });
});
