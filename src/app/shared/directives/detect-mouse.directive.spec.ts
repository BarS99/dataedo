import { TestBed } from '@angular/core/testing';
import { DetectMouseDirective } from './detect-mouse.directive';

describe('DetectMouseDirective', () => {
  let directive: DetectMouseDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({}).runInInjectionContext(() => {
      directive = new DetectMouseDirective();
    });
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('emit mouse event', () => {
    let emitSpy: jasmine.Spy;

    beforeEach(() => {
      emitSpy = spyOn(directive.appDetectMouse, 'emit');
    });

    it('should emit true when mouse enters the element', () => {
      directive.mouseEnter();

      expect(emitSpy).toHaveBeenCalledWith(true);
    });

    it('should emit true when mouse enters the element', () => {
      directive.mouseLeave();

      expect(emitSpy).toHaveBeenCalledWith(false);
    });
  });
});
