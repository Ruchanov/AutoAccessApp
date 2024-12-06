import { InputsCheckerDirective } from './inputs-checker.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('InputsCheckerDirective', () => {
  let directive: InputsCheckerDirective;
  let elementRefMock: any;
  let rendererMock: Renderer2;

  beforeEach(() => {
    elementRefMock = {
      nativeElement: { value: '' }
    };
    rendererMock = jasmine.createSpyObj('Renderer2', ['setStyle']);
    directive = new InputsCheckerDirective(elementRefMock, rendererMock);
    directive.minLength = 8;
  });

  it('should set border to green when input length is >= minLength', () => {
    elementRefMock.nativeElement.value = '12345678';
    directive.onInput();
    expect(rendererMock.setStyle).toHaveBeenCalledWith(
      elementRefMock.nativeElement,
      'border',
      '2px solid green'
    );
  });

  it('should set border to red when input length is < minLength', () => {
    elementRefMock.nativeElement.value = '123';
    directive.onInput();
    expect(rendererMock.setStyle).toHaveBeenCalledWith(
      elementRefMock.nativeElement,
      'border',
      '2px solid red'
    );
  });
});
