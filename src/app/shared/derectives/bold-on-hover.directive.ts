import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appBoldOnHover]',
})
export class BoldOnHoverDirective {

  constructor(private el:ElementRef) {}

  @HostBinding('style.font-weight') fontWeght: string = 'normal';

  @HostListener('mouseenter')
  onEnter(): void {
    this.fontWeght = 'bold';
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.fontWeght = 'normal';
  }

}
