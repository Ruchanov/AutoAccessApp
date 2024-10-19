import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appEmailCorrectnessChecker]'
})
export class EmailCorrectnessCheckerDirective {
  inputsValue : string = '';
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input') onInput() {
    this.inputsValue = this.el.nativeElement.value;
    if (!this.containsAtSymbol(this.inputsValue)) {
      this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid red');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid green');
    }
  }

  // Функция для проверки наличия символа '@'
  private containsAtSymbol(value: string): boolean {
    return value.includes('@');
  }

  // Функция для изменения цвета рамки
  private setBorderColor(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'border', `2px solid ${color}`);
  }
}