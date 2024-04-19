import { Directive, HostBinding, input } from '@angular/core';

export type AppButtonType = '' | 'link';

@Directive({
  selector: '[appButton]',
  standalone: true,
  exportAs: 'appButton',
})
export class ButtonDirective {
  public appButton = input<AppButtonType>('');

  @HostBinding('class.app-button')
  get isDefaultButton(): boolean {
    return this.appButton() === '';
  }

  @HostBinding('class.app-link-button')
  get isLinkButton(): boolean {
    return this.appButton() === 'link';
  }

  get activeStateClassName(): string {
    return this.appButton() === ''
      ? 'app-button--active'
      : 'app-link-button--active';
  }
}
