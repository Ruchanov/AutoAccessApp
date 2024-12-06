import { EmailCorrectnessCheckerDirective } from './email-correctness-checker.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('EmailCorrectnessCheckerDirective', () => {
  let directive: EmailCorrectnessCheckerDirective;
  let elementRefMock: any;
  let rendererMock: Renderer2;

  beforeEach(() => {
    elementRefMock = {
      nativeElement: { value: '' }
    };
    rendererMock = jasmine.createSpyObj('Renderer2', ['setStyle']);
    directive = new EmailCorrectnessCheckerDirective(elementRefMock, rendererMock);
  });

  it('should set border to green when input contains "@"', () => {
    elementRefMock.nativeElement.value = 'test@example.com';
    directive.onInput();
    expect(rendererMock.setStyle).toHaveBeenCalledWith(
      elementRefMock.nativeElement,
      'border',
      '2px solid green'
    );
  });

  it('should set border to red when input does not contain "@"', () => {
    elementRefMock.nativeElement.value = 'invalidemail.com';
    directive.onInput();
    expect(rendererMock.setStyle).toHaveBeenCalledWith(
      elementRefMock.nativeElement,
      'border',
      '2px solid red'
    );
  });
});
