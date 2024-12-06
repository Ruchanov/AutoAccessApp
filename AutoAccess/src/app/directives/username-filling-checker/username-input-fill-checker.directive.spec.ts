import { UsernameInputFillCheckerDirective } from './username-input-fill-checker.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('UsernameInputFillCheckerDirective', () => {
  let directive: UsernameInputFillCheckerDirective;
  let elementRefMock: any;
  let rendererMock: Renderer2;

  beforeEach(() => {
    elementRefMock = {
      nativeElement: { value: '' }
    };
    rendererMock = jasmine.createSpyObj('Renderer2', ['setStyle']);
    directive = new UsernameInputFillCheckerDirective(elementRefMock, rendererMock);
  });

  it('should set border to green when input is not empty', () => {
    elementRefMock.nativeElement.value = 'username';
    directive.onInput();
    expect(rendererMock.setStyle).toHaveBeenCalledWith(
      elementRefMock.nativeElement,
      'border',
      '2px solid green'
    );
  });

  it('should set border to red when input is empty', () => {
    elementRefMock.nativeElement.value = '';
    directive.onInput();
    expect(rendererMock.setStyle).toHaveBeenCalledWith(
      elementRefMock.nativeElement,
      'border',
      '2px solid red'
    );
  });
});
