import { Directive, HostBinding, HostListener, Input, OnDestroy } from '@angular/core';
import { IGradientConfiguration } from '../../../interface/IGradientConfiguration';

@Directive({
  selector: '[appGradientBorder]',
})
export class GradientBorderDirective implements OnDestroy {

  @Input() GradientConfiguration: IGradientConfiguration = {
    delay: 3000,
    colors:[
    '#1b5e20', 
    '#2e7d32', 
    '#66bb6a', 
    ],
    thickness: '6px'
  }

  private timer!: number;

  @HostBinding('style.border') border: string = '2px solid #0455f6';

  @HostListener('mouseenter')
  onEnter(): void {
    console.log(this.timer)
    if(this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.border = `2px solid #f60404 !important`;
    }, this.GradientConfiguration.delay);
    console.log(this.timer)

  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.border = '0'
    clearTimeout(this.timer);
  }

 ngOnDestroy() {
    clearTimeout(this.timer);
  }

}
