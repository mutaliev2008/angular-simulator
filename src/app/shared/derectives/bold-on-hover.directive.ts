import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appBoldOnHover]',
})
export class BoldOnHoverDirective {

  constructor(private el:ElementRef) {}

  @HostBinding('style.font-weight') fontWeght: string = 'normal'

  @HostListener('mouseenter')
  onEnter() {
    this.fontWeght = 'bold'
  }

  @HostListener('mouseleave')
  onLeave() {
    this.fontWeght = 'normal'
  }

}
