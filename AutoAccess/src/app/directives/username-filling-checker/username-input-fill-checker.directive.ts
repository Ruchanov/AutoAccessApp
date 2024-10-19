import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appUsernameInputFillChecker]'
})
export class UsernameInputFillCheckerDirective {

  constructor(private el: ElementRef, private renderer: Renderer2, ) {}

  @HostListener('input') onInput() {
    const input = this.el.nativeElement.value;
    if (input.length == 0) {
      this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid red');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'border', '2px solid green');
    }
  }
}