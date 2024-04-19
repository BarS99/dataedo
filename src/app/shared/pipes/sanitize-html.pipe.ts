import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeHtml',
  pure: true,
  standalone: true,
})
export class SanitizeHtmlPipe implements PipeTransform {
  private domSanitizer = inject(DomSanitizer);

  public transform(value: string): string | null {
    return this.domSanitizer.sanitize(1, value);
  }
}
