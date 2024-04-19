import { TestBed } from '@angular/core/testing';
import { SanitizeHtmlPipe } from './sanitize-html.pipe';
import { DomSanitizer } from '@angular/platform-browser';

const MOCK_SAFE_HTML = 'sanitized HTML';

describe('SanitizeHtmlPipe', () => {
  let pipe: SanitizeHtmlPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({}).runInInjectionContext(() => {
      pipe = new SanitizeHtmlPipe();
    });
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return sanitized html', () => {
    const sanitizeSpy = spyOn(pipe['domSanitizer'], 'sanitize').and.returnValue(
      MOCK_SAFE_HTML,
    );
    const sanitizedText = 'test text';

    const result = pipe.transform(sanitizedText);

    expect(sanitizeSpy).toHaveBeenCalledWith(1, sanitizedText);
    expect(result).toBe(MOCK_SAFE_HTML);
  });
});
