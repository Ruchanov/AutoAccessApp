import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appInputsChecker]'
})
export class InputsCheckerDirective {
  @Input() minLength: number = 8; 
  inputsLength : number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2, ) {}

  @HostListener('input') onInput() {
    this.inputsLength = this.el.nativeElement.value.length;
    if (this.inputsLength < this.minLength) {
      this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid red');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid green');
    }
  }
}