import { ChangeDetectorRef, Directive, Host, HostBinding, HostListener, inject, Input, OnDestroy } from '@angular/core';
import { IGradientConfiguration } from '../../../interface/IGradientConfiguration';

@Directive({
  selector: '[appGradientBorder]',
})
export class GradientBorderDirective implements OnDestroy {

  @Input() gradientConfiguration: Partial<IGradientConfiguration> = {
    delay: 1000,
    colors:[
    '#1b5e20', 
    '#f90202', 
    '#6600ff', 
    ],
    thickness: '6px'
  }

  private timer!: number;
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  @HostBinding('style.border') border: string = '0';
  @HostBinding('style.border-image') brImg: string = '0';
  @HostBinding('style.animation') animation: string = '0';

  @HostListener('mouseenter')
  onEnter(): void {
    this.timer = setTimeout(() => {
      this.border = '2px solid';
      this.animation = '10s rotate linear infinite';
      this.brImg = `linear-gradient(var(--angle),
      ${ this.gradientConfiguration.colors[0] }, 
      ${ this.gradientConfiguration.colors[1] }, 
      ${ this.gradientConfiguration.colors[2] }) 1`;
      this.cdr.markForCheck();
    }, this.gradientConfiguration.delay);
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.border = '0';
    this.brImg = '0';
    clearTimeout(this.timer);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }

}
