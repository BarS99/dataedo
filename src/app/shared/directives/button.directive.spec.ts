import { TestBed } from '@angular/core/testing';
import { AppButtonType, ButtonDirective } from './button.directive';
import { input } from '@angular/core';

describe('ButtonDirective', () => {
  let directive: ButtonDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({}).runInInjectionContext(() => {
      directive = new ButtonDirective();
    });
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('isDefaultButton', () => {
    it('should return true if input value equals default value type', () => {
      TestBed.runInInjectionContext(() => {
        directive.appButton = input<AppButtonType>('');
      });

      expect(directive.isDefaultButton).toBeTrue();
    });

    it('should return false if input value does not equal default value type', () => {
      TestBed.runInInjectionContext(() => {
        directive.appButton = input<AppButtonType>('link');
      });

      expect(directive.isDefaultButton).toBeFalse();
    });
  });

  describe('isLinkButton', () => {
    it('should return true if input value equals link value type', () => {
      TestBed.runInInjectionContext(() => {
        directive.appButton = input<AppButtonType>('link');
      });

      expect(directive.isLinkButton).toBeTrue();
    });

    it('should return false if input value does not equal link value type', () => {
      TestBed.runInInjectionContext(() => {
        directive.appButton = input<AppButtonType>('');
      });

      expect(directive.isLinkButton).toBeFalse();
    });
  });

  describe('activeStateClassName', () => {
    it('should return an active state for default button', () => {
      TestBed.runInInjectionContext(() => {
        directive.appButton = input<AppButtonType>('');
      });

      expect(directive.activeStateClassName).toBe('app-button--active');
    });

    it('should return an active state for link button', () => {
      TestBed.runInInjectionContext(() => {
        directive.appButton = input<AppButtonType>('link');
      });

      expect(directive.activeStateClassName).toBe('app-link-button--active');
    });
  });
});
