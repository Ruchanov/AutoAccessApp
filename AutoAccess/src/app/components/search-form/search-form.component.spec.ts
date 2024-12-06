import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SearchFormComponent } from './search-form.component';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchFormComponent],
      imports: [FormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit searchQueryChange on input change', () => {
    spyOn(component.searchQueryChange, 'emit');
    const input = fixture.debugElement.nativeElement.querySelector('input');
    input.value = 'Test';
    input.dispatchEvent(new Event('input'));
    expect(component.searchQueryChange.emit).toHaveBeenCalledWith('Test');
  });
});
