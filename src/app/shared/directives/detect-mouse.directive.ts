import { Directive, HostListener, output } from '@angular/core';

@Directive({
  selector: '[appDetectMouse]',
  standalone: true,
})
export class DetectMouseDirective {
  public appDetectMouse = output<boolean>();

  @HostListener('mouseenter')
  public mouseEnter(): void {
    this.appDetectMouse.emit(true);
  }

  @HostListener('mouseleave')
  public mouseLeave(): void {
    this.appDetectMouse.emit(false);
  }
}
